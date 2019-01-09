const validation = require('../../helpers/validation');
const { users } = require('../../db/models');

module.exports = async (req,res) => {
    const { body : {firstName, lastName, email, password} } = req;

    try {
        const errors = [];

        if(!firstName){
            errors.push('Missing first name');
        } else if (!validation.name(firstName)){
            errors.push('First name can only contain a-z, no special characters allowed');
        }

        if(!lastName){
            errors.push('Missing last name');
        } else if (!validation.name(lastName)){
            errors.push('Last name can only contain a-z, no special characters allowed');
        }

        if(!email){
            errors.push('Missing email address');
        } else if (!validation.email(email)){
            errors.push('Email address is invalid, Must be in the same format as: janedoe@email.com');
        }
        
        if(!password){
            errors.push('Missing password');
        } else if (!validation.password(password)){
            errors.push('Password is invalid, must contain at least one uppercase letter, lowercase letter, numbers, special characters, and be between 8 and 32 characters long');
        }
        
        if(errors.length){
            return res.status(422).send({
                success: false,
                errors
            });
        }
        
        const existingUser = await users.findOne({
            where: { email }
        });
        
        console.log("Existing User: ", existingUser);

        if(existingUser){
            return res.status(422).send('User already exists');
        }

        const newUser = users.build({
            email,
            firstName,
            lastName,
            password
        });

        await newUser.save();

        res.send({
            success: true,
            message: "this is the sign up endpoint"
        })
    } catch (err) {
        console.log("Sign Up Error: ", err);

        res.status(500).send("Sign Up Failed");
    }
}