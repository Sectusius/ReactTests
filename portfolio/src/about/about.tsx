import React, { useState } from 'react';
import './about.css';
import { useEffect } from "react";
import SectionData from '../types/sectionData';
import SectionService from '../services/sectionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'

const About = () => {
    //STATES
    const [aboutSection, setAboutSection] = useState<SectionData | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedContent, setUpdatedContent] = useState<SectionData | null>(null);
    const [profileImg, setProfileImg] = useState<string>('https://avatars.githubusercontent.com/u/56181697?v=4');
    const [isProfileImgEditing, setIsProfileImgEditing] = useState<boolean>(false);

    //MODAL CONFIG
    const customStyles = {
        overlay:{
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        content:{
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform:'translate(-50%, -50%)',
        }
    };

    //PROFILE IMAGE CHANGING

    const fetchProfileImg = async () => {
        try {
            const profileImg = await SectionService.get('ProfileImg');
            if(profileImg.data){
                setProfileImg(profileImg.data.content);
            }
            console.log(profileImg);
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleProfileImgClosed = () => {
        setIsProfileImgEditing(false);
    };

    const handleProfileImgEditClick = () => {
        setIsProfileImgEditing(true);
    };

    const handleProfileImgChange = async (e: any) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        const image:SectionData = {id:null, title:'ProfileImg', content:url};
        const actualProfileImg = await SectionService.get('ProfileImg');
        if(actualProfileImg.data){
            try {
                const profileImg = await SectionService.update('ProfileImg', image);
                setProfileImg(profileImg.data.content);
                console.log(profileImg);
            }
            catch (error) {
                console.log(error);
            }
        }else{
            try {
                const profileImg = await SectionService.create(image);
                setProfileImg(profileImg.data.content);
                console.log(profileImg);
            }
            catch (error) {
                console.log(error);
            }
        }

    };

    //ABOUT SECTION CHANGING

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

    const handleEditClick = () => {
        setUpdatedContent(aboutSection);
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const actualAboutSection = await SectionService.get('About');
        console.log(actualAboutSection);
        if(actualAboutSection.data){
            try{
                console.log(updatedContent);
                const updatedSection = await SectionService.update(updatedContent!.title, updatedContent!);
                fetchSectionData();
                setIsEditing(false);
            } catch (error) {
                console.log(error);
            }
        } else{
            updatedContent!.title='About';
            try{
                console.log(updatedContent);
                const updatedSection = await SectionService.create(updatedContent!);
                fetchSectionData();
                setIsEditing(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    //RENDER SECTIONS

    useEffect(() => {
        fetchProfileImg();
        fetchSectionData();
    }, []);

    return (
        
        <div className="about">
            <div className='profilePicture card rounded-circle overflow-hidden' onClick={handleProfileImgEditClick}>
                <img className='picture-view' src={profileImg} alt='Profile' ></img>
                <div className='middle-picture text-center card-img-overlay d-none flex-column justify-content-center'>
                    <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
                </div>
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
                            <FontAwesomeIcon icon={faPencil} onClick={handleEditClick} style={{cursor:'pointer', marginLeft:'10px'}}></FontAwesomeIcon>
                        </>
                    )}
            </div>
            <Modal isOpen={isProfileImgEditing} onRequestClose={handleProfileImgClosed} style={customStyles} >
                <div className='modal-header'>
                    <h2 className='modal-title'>Cambiar Imagen de Perfil</h2>
                </div>
                <div className='modal-body' style={{margin:'10px'}}>
                    <input type='file' accept='image/*' onChange={handleProfileImgChange} ></input>
                </div>
                <div className='modal-footer' style={{justifyContent:'center'}}>
                    <button className='btn btn-warning' onClick={handleProfileImgClosed}>Cancelar</button>
                </div>
            </Modal>
        </div>
    )
}

export default About;


