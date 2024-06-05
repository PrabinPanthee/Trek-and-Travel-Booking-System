


function tourCreatingValidation(formData) {
    const errors = {};

    const requiredFields = ['title', 'city', 'address', 'distance', 'desc', 'price', 'maxGroupSize'];
    requiredFields.forEach(field => {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
    });

    const maxGroupSize = formData.get('maxGroupSize');
    const distance = formData.get('distance');
    const price = formData.get('price');

    if (!maxGroupSize || isNaN(maxGroupSize) || maxGroupSize <= 0 || maxGroupSize > 25) {
        errors.maxGroupSize = 'Guest Size must be a positive number and less than 25';
    }

    if (!distance || isNaN(distance) || distance <= 0) {
        errors.distance = 'Distance must be a positive number';
    }

    if (formData.get('photo')) {
        const photo = formData.get('photo');
        if (photo.size > 1048576) {
            errors.photo = 'Photo size should not exceed 1 MB';
        }
    }

    if (!price || isNaN(price) || price <= 0) {
        errors.price = 'Price must be a positive number';
    }

    return errors;
}

export default tourCreatingValidation;

   