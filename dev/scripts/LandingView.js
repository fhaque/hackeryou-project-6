import React from 'react';

const LandingView = function(props) {
    return (
        <div className="landing__section wrapper">
            Welcome!
            <br />
            Don't you hate when people flake out? This is an app to combat Flakers! Create a "Flakey" or commitment amongst your friends.

            Full featured app using real life financial commitment coming soon!

            <ol className="landing__list">
                <li>Login.</li>
                <li>Create a new "Flakey".</li>
                <li>Give the Flakey a Name, Expiration or Event date and time, and a punishment amount.</li>
                <li>Click the "Share Key" to copy the key to share with friends.</li>
                <li>Have friends Login and enter the key in the Flakey Search bar.</li>
                <li>Have friend click the "Commit to FLakey" button to commit!</li>
                <li>If you are the creator of the Flakey, you can "Edit" the Flakey and check-off who Flaked.</li>
                <li>After the FLakey expires, the Flakey will indicate if your friend flaked.</li>
            </ol>
        </div>
    );
}

export default LandingView;