import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount () {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: 
                    '876282816652-5qa5oemrcuesv512m05spgso3m1ch001.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => { 
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get()); // since this is on load need to get it from the browser
                this.auth.isSignedIn.listen(this.onAuthChange); // listens for the status changing (again in the brower)
            });
        });
    }

    // call back method to tell if signin status changes or not 
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <div>
                    To Use Application Sign In with Google  
                    <button onClick={this.onSignInClick} className="ui green google button">
                        <i className="google icon"/>
                        Sign In With google
                    </button>
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
};

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(
    mapStateToProps, 
    { signIn, signOut }
)(GoogleAuth);