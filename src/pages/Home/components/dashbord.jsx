function Dashboard(props){
    return(
        <div className="Profile-panel">
            <img src="" alt="profile-photo" className="profile-photo" />
            <h1><strong>{props.user}</strong></h1>

        </div>
    )
}

export default Dashboard