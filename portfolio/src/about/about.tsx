import React from 'react';
import './about.css';

const About = () => {
    return (
        
        <div className="about">
            <div className='profilePicture'>
                <img src='https://avatars.githubusercontent.com/u/56181697?v=4' alt='Profile' ></img>
            </div>
            <div className="about-content">
                <h1>Acerca de mi</h1>
                <p>
                    Soy un estudiante de licenciatura informatica en la Universidad Nacional de La Plata. 
                    Resido en La Plata, Buenos Aires, Argentina.
                    Éste es un pequeño projecto realizado utilizando React y bootsrap, 
                    con el fin de practicar y aprender sobre el desarrollo web.
                    
                </p>
            </div>
        </div>
    )
}

export default About;


