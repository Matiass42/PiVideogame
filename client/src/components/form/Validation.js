export default function validation(input){
    //Defino un objeto al cual le vamos a pasar todos los errores que detectemos
    let errors = {};

    //Valido 
    if(!input.name){
        errors.name = "Name is required";
    }else if(!/^[a-zA-Z0-9-() .]+$/.test(input.name)){
        errors.name = "Only accepts letters, numbers, hyphens, and parentheses"
    }else if(input.name.length > 50){
        errors.name = "The name has exceended the 50 characters allowed";
    }
    if(!input.description){
        errors.description = "Description is required";
    }else if(input.description.length > 100){
        errors.description = "The description has a maximum of 100 characters allowed";
    }
    if(!input.released){
        errors.released = "The date is required";
    }
    if(!input.rating){
        errors.rating = "The rating is required";
    }else if(input.rating >= 5 || input.rating <= 0){
        errors.rating = "The rating must be between 0 to 5";
    }
    if(!input.image){
        errors.image = "The image URL is required";
    }
    if(!input.platforms){
        errors.platforms = "Minimum one platform requered";
    }
    return errors;
}