import { Section } from "../models/section.model";
import { db } from "../db";

const insertSection = async () => {
    try {
    await db.authenticate();
    console.log('Connection has been established successfully.');

    const section = await Section.create({
        title: 'About',
        content: "Soy un estudiante de licenciatura informatica en la Universidad Nacional de La Plata. Resido en La Plata, Buenos Aires, Argentina.\n Éste es un pequeño projecto realizado utilizando React y bootsrap, con el fin de practicar y aprender sobre el desarrollo web."
        });
    console.log("Section was created successfully:", JSON.stringify(section, null, 2));
    }catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
       await db.close();
    }
};

insertSection();
