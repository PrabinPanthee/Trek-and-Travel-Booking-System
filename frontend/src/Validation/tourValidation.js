function tourValidation(data) {
    const errors = {};

    // Required fields
    const requiredFields = ['title', 'city', 'address', 'distance', 'desc', 'price', 'maxGroupSize'];

    // Check for empty fields
    requiredFields.forEach(field => {
        if (!data[field] || data[field].toString().trim() === '') {
            errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        }
    });

    // Parse numeric fields
    const maxGroupSize = parseInt(data.maxGroupSize);
    const distance = parseInt(data.distance);
    const price = parseInt(data.price);

    // Validate maxGroupSize
    if (isNaN(maxGroupSize) || maxGroupSize <= 0 || maxGroupSize > 25) {
        errors.maxGroupSize = 'Guest Size must be a positive number and less than 25';
    }

    // Validate distance
    if (isNaN(distance) || distance <= 0) {
        errors.distance = 'Distance must be a positive number';
    }

    // Validate photo size if photo is provided
    if (data.photo && data.photo.size > 1048576) {
        errors.photo = 'Photo size should not exceed 1 MB';
    }

    // Validate price
    if (isNaN(price) || price <= 0) {
        errors.price = 'Price must be a positive number';
    }

    return errors;
}

export default tourValidation;
