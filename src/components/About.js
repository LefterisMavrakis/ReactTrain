function About() {
    return (
        <div className={'containerWrapper'}>
            <div className="container">
                <div className="containerPage">
                    <div className="aboutInfo">
                        <h2>About this website:</h2>
                        <p>
                            This application was made for training purposes in react and there is no commercial transaction through it.
                        </p>
                        <div className="trainList">
                            <h2>
                                Training Sections:
                            </h2>
                            <ul>
                                <li>React</li>
                                <li>React Router</li>
                                <li>React Context Api</li>
                                <li>React Hooks</li>
                                <li>React Custom Hooks</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
