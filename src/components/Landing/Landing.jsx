import './Landing.css'

const Landing = ({ user }) => {
    
    return (
        <div className='mainContainer'>
            <div className='headerArea'>
                <h1>Foody Feedback</h1>
                <p>A place to rate our favorite restaurants!</p>
            </div>
            <img src="../../../public/images/logo.png" alt="foody feedback logo"/>
        </div>
    )
}

export default Landing