
const Landing = ({ user }) => {
    
    return (
        <>
            { user ? (
                <h1>Hello, {user.username}</h1>
            ) : (
                <h1>Hello, Guest</h1>
            )}
        </>
    )
}

export default Landing