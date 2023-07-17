import React, { useState } from 'react';
import './about.css';
import { useEffect } from "react";
import SectionData from '../types/sectionData';
import SectionService from '../services/sectionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    const [aboutSection, setAboutSection] = useState<SectionData | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedContent, setUpdatedContent] = useState<SectionData | null>(null);

    const fetchSectionData = async () => {
        try {
            const sectionData = await SectionService.get('About');
            setAboutSection(sectionData.data);
            console.log(sectionData);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        fetchSectionData();
    }, []);

    const handleEditClick = () => {
        setUpdatedContent(aboutSection);
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try{
            console.log(updatedContent);
            const updatedSection = await SectionService.update(updatedContent!.title, updatedContent!);
            console.log(updatedSection);
            fetchSectionData();
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        
        <div className="about">
            <div className='profilePicture'>
                <img src='https://avatars.githubusercontent.com/u/56181697?v=4' alt='Profile' ></img>
            </div>
            <div className="about-content">
                <h1>Acerca de mi</h1>
                {isEditing ? (
                    <>
                        <textarea
                            value={updatedContent?.content}
                            onChange={(e) => setUpdatedContent({ ...updatedContent!, content: e.target.value })}
                            style={{width:'100%', height:'200px', color:"white"}}
                        />
                        <button className='btn btn-primary' onClick={handleSaveClick}>Guardar</button>
                        <button className='btn btn-warning' onClick={handleCancelClick}>Cancelar</button>
                    </>) : (
                        <>
                        <p style={{whiteSpace:"pre-line", display:'inline-block'}}>
                            {aboutSection?.content}
                            
                        </p>
                            <FontAwesomeIcon icon={faPencil} onClick={handleEditClick} style={{cursor:'pointer'}}></FontAwesomeIcon>
                        </>
                    )}
            </div>
        </div>
    )
}

export default About;


