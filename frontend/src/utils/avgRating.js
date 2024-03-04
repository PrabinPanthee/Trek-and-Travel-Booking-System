


const calculateAvgRating = reviews=>{
    const totalReview = reviews?.reduce((acc,item)=> acc + item.rating,0);
    const avgRating = totalReview === 0 ? "" 
    : totalReview === 1?totalReview 
    :(totalReview/reviews.length).toFixed(1);
    return{
        totalReview,
        avgRating
    }
}
export default calculateAvgRating;