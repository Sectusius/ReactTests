import React, { useState } from 'react';
import './about.css';
import { useEffect } from "react";
import SectionData from '../types/sectionData';
import SectionService from '../services/sectionService';

const About = () => {
    const [aboutSection, setAboutSection] = useState<SectionData | null>(null);
    useEffect(() => {
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
        fetchSectionData();
    }, []);
    return (
        
        <div className="about">
            <div className='profilePicture'>
                <img src='https://avatars.githubusercontent.com/u/56181697?v=4' alt='Profile' ></img>
            </div>
            <div className="about-content">
                <h1>Acerca de mi</h1>
                <p style={{whiteSpace:"pre-line"}}>
                    {aboutSection?.content}
                </p>
            </div>
        </div>
    )
}

export default About;


