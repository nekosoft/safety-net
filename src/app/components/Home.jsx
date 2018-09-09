import Button            from '@material-ui/core/es/Button/Button';
import Input             from '@material-ui/core/es/Input/Input';
import React             from 'react';
import { withStyles }    from '@material-ui/core/styles';
import SafetyNetLogo     from 'Assets/images/safety-net-logo.png';
import { POSTCODE_DATA } from 'App/config';
import BodyClassName from 'react-body-classname';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const styles = {
    Title: {
        textAlign: 'center',
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);

        // console.log('pc', POSTCODE_DATA.find( pc => pc.postcode === parseInt("3057") ).place_name);

        this.state = {
            step: 'name',
            name: '',
            postcode: '',
            pet: '',
            stepContent: (
                <CSSTransition timeout={1000} classNames="fade" className="fade" key={"name"}>
                    <div>
                        <p style={ { fontSize: '22px', animationDelay: '1s', marginBottom: '0' }} className={"fade-anim"}>Hi there! I'm Sam.</p>

                        <p style={ { fontSize: '22px', animationDelay: '2s', marginTop: '0' }} className={"fade-anim"}>Lovely day, isn't it?</p>

                        <p style={ { fontSize: '22px', animationDelay: '4s' }} className={"fade-anim"}>What's your name?</p>

                        <div style={ { fontSize: '22px', animationDelay: '5s' }} className={"fade-anim"}>
                            <Input
                                disableUnderline={true}
                                style={ { width: '80%' }}
                                onChange={ this.onInputChange.bind(this) }
                            />

                            <br /><br/>

                            <Button onClick={ this.onClickNext.bind(this) } variant={"contained"} color={"primary"}>Next</Button>
                        </div>
                    </div>
                </CSSTransition>
            )
        };
    }

    onInputChange(event) {
        if (this.state.step === 'name') {
            this.setState( { name: event.target.value } );
        }
        else if (this.state.step === 'postcode') {
            this.setState( { postcode: event.target.value } );
        }
        else if (this.state.step === 'email') {
            this.setState( { email: event.target.value } );
        }
        else if (this.state.step === 'pet') {
            this.setState( { pet: event.target.value } );
        }

        setTimeout( () => { console.log(this.state) }, 1000);
    }

    onClickNext() {
        if (this.state.step === 'name') {
            this.setState( { step: 'postcode',
                           stepContent: (
                               <CSSTransition timeout={1000} classNames="fade" className="fade" key={"postcode"}>
                                   <div>
                                       <p style={ { fontSize: '22px', animationDelay: '1s' }} className={"fade-anim"}>
                                           Oh, that's such a lovely name - my grandchild's name is { this.state.name } too!
                                       </p>

                                       <p style={ { fontSize: '22px', animationDelay: '3s' }} className={"fade-anim"}>
                                           Would you mind helping me out for a moment? I'm doing a quick survey for work.
                                       </p>

                                       <p style={ { fontSize: '22px', animationDelay: '4.5s' }} className={"fade-anim"}>Would you kindly tell me your postcode?</p>

                                       <div style={ { fontSize: '22px', animationDelay: '4.5s' }} className={"fade-anim"}>
                                           <Input
                                               disableUnderline={true}
                                               style={ { width: '80%' }}
                                               onChange={ this.onInputChange.bind(this) }
                                           />

                                           <br /><br/>

                                           <Button onClick={ this.onClickNext.bind(this) } variant={"contained"} color={"primary"}>Next</Button>
                                       </div>
                                   </div>
                               </CSSTransition>
                           )} );
        }
        else if (this.state.step === 'postcode') {
            var suburb = POSTCODE_DATA.find( pc => pc.postcode === parseInt( this.state.postcode) );

            this.setState( { step: 'email',
                               stepContent: (
                                   <CSSTransition timeout={1000} classNames="fade" className="fade" key={"email"}>
                                       <div>

                                           { ( suburb !== undefined ) && (
                                               <p style={ { fontSize: '22px', animationDelay: '1s' }} className={"fade-anim"}>
                                                I grew up in { suburb.place_name }! Lovely area, isn't it?
                                               </p>
                                           ) }

                                           { ( suburb === undefined ) && (
                                               <p style={ { fontSize: '22px', animationDelay: '1s' }} className={"fade-anim"}>
                                                   I grew up around there! Lovely area, isn't it?
                                               </p>
                                           ) }


                                           <p style={ { fontSize: '22px', animationDelay: '3s' }} className={"fade-anim"}>Thanks so much for your help with the survey. So we can send you the results, what is your email address?</p>

                                           <div style={ { fontSize: '22px', animationDelay: '4s' }} className={"fade-anim"}>
                                               <Input
                                                   disableUnderline={true}
                                                   style={ { width: '80%' }}
                                                   onChange={ this.onInputChange.bind(this) }
                                               />


                                               <br /><br/>

                                               <Button onClick={ this.onClickNext.bind(this) } variant={"contained"} color={"primary"}>Next</Button>
                                           </div>
                                       </div>
                                   </CSSTransition>
                               )} );
        }
        else if (this.state.step === 'email') {
            this.setState( { step: 'pet',
                               stepContent: (
                                   <CSSTransition timeout={1000} classNames="fade" className="fade" key={"pet"}>
                                       <div>
                                           <p style={ { fontSize: '22px', animationDelay: '1s' }} className={"fade-anim"}>
                                               Fantastic, thank you.
                                           </p>

                                           <p style={ { fontSize: '22px', animationDelay: '3s' }} className={"fade-anim"}>Anyway, I need to go walk my dog before she destroys my home!</p>

                                           <p style={ { fontSize: '22px', animationDelay: '3.5s' }} className={"fade-anim"}>Do you have a pet? What's their name?</p>

                                           <div style={ { fontSize: '22px', animationDelay: '4.5s' }} className={"fade-anim"}>
                                               <Input
                                                   disableUnderline={true}
                                                   style={ { width: '80%' }}
                                                   onChange={ this.onInputChange.bind(this) }
                                               />


                                               <br /><br/>

                                               <Button onClick={ this.onClickNext.bind(this) } variant={"contained"} color={"primary"}>Next</Button>
                                           </div>
                                       </div>
                                   </CSSTransition>
                               )} );
        }
        else if (this.state.step === 'pet') {
            this.setState( { step: 'outtro',
                               stepContent: (
                                   <CSSTransition timeout={1000} classNames="fade" className="fade" key={"outtro"}>
                                       <div>

                                           { this.state.pet !== '' && (
                                               <p style={ { fontSize: '22px', animationDelay: '1s' }} className={"fade-anim"}>
                                                Well, I hope that you and { this.state.pet } have a wonderful day. Thank you for your help.
                                               </p>
                                           )}

                                           { this.state.pet === '' && (
                                               <p style={ { fontSize: '22px', animationDelay: '1s' }} className={"fade-anim"}>
                                                   Well, I hope that you have a wonderful day. Thank you for your help.
                                               </p>
                                           )}


                                           <div style={ { fontSize: '22px', animationDelay: '2s' }} className={"fade-anim"}>

                                               <Button onClick={ this.onClickNext.bind(this) } variant={"contained"} color={"primary"}>Next</Button>
                                           </div>
                                       </div>
                                   </CSSTransition>
                               )} );
        }
        else if (this.state.step === 'outtro') {
            this.setState( { step: 'next',
                               stepContent: (
                                   <CSSTransition timeout={1000} classNames="fade" className="fade" key={"next"}>
                                           <div>

                                               <p style={ { fontSize: '22px', animationDelay: '1s' }} className={"fade-anim"}>
                                                   You just provided enough information to "Sam" to impersonate you and gain access to your bank account.
                                               </p>

                                               <p style={ { fontSize: '22px', animationDelay: '4s' }} className={"fade-anim"}>
                                                   <strong>Every year, one in twelve Australians have their identities stolen through seemingly innocent interactions.</strong>
                                               </p>

                                               <p style={ { fontSize: '22px', animationDelay: '8s' }} className={"fade-anim"}>
                                                   Click Next to learn more about common scams and phishing methods and how you can identify them, and learn more about the impact it can have on you.
                                               </p>


                                               <div style={ { fontSize: '22px', animationDelay: '9s' }} className={"fade-anim"}>
                                                   <Button onClick={ this.onClickNext.bind(this) } variant={"contained"} color={"primary"}>Next</Button>
                                               </div>
                                           </div>
                                   </CSSTransition>
                               )} );
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <BodyClassName className={ (this.state.step === 'next' ? "bg-red" : '') }>
                <div style={ { textAlign: 'center', marginTop: '120px', padding: '16px', }}>
                    <img src={ SafetyNetLogo } style={ { width: '80%' }} />

                    <br/><br/><br/>

                    <TransitionGroup className={"step-group"}>
                        { this.state.stepContent }
                    </TransitionGroup>
                </div>
            </BodyClassName>
        );
    }
}


export default withStyles(styles)(Home);