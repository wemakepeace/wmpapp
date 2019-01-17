import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

class AboutProgramAccordion extends Component {
    state = {
        activeIndex: -1
    }

     handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <div>
                <h3>About the Peace Letter Program</h3>
                <Accordion>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    About the program
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <div>
                            <p>We Make Peace offers a Peace Letter exchange program for students between age 8-13 years. This is an exciting chance for students to befriend a student from another country through letter exchanges.</p>
                            <p>It is our aim to promote friendships across borders, enhance literacy and acceptance of diversity, to activate empathy and increase awareness of peace as a strong ideal for young people to aspire to.</p>
                            <p>Over the last seven years this program has allowed students from different countries to write letters with each other. Each student shares life experiences, art and learns from another student through three letters, all in the name of promoting friendship and non-violent communication. The Peace Letter program provides the participating students with a platform where they can express themselves freely while also learning about the life of a student from a different culture. It also provides a meaningful experience for the teachers who are helping facilitate the exchange.</p>
                        </div>
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    How it works
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <div>
                            <p>The program consists of three letters that the students will exchange with their letter friend. The students will use a printed letter template to write the letters, in which they will be discussing and sharing their thoughts on topics relating to PEACE - Positivity, Empathy, Acceptance, Compassion, and Equality. They will also be able to make drawings for each other.</p>
                            <p>As a teacher, you will follow the Program Instructions. Each of the three letter writing sessions will have specific lessons that tackle the topics the students will be writing about. The topics are sometimes abstract and for young minds it is valuable to discuss with you and other students before writing.</p>
                            <p>To get started, register your class and follow the instructions. Once your class is registered, make sure to initiate the exchange. If there is a class that matches with yours, both you and the other teacher will need to confirm the program participation within 7 days.</p>
                            <p>If there is not currently a class available that matches your class, you will be notified via email once there is an exchange match. Once a match is made, you must confirm the participation within 7 days.</p>
                            <p>Once a match has been made, and both classes have confirmed their participation, your class will be ready to begin the Peace Letter Exchange Program. At this point you will have the name and email address of the other class’ teacher and be able to connect with each other, and you will be granted access to all instructions and materials needed.</p>
                        </div>
                    </Accordion.Content>
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Cost of participation
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <div>
                            <p>The program is FREE to use. However, the cost of printing and postage must be covered by the participating class.</p>
                            <p>We realize that many teachers are not given sufficient resources as it is, so we are working on developing a Sponsorship option for classes that need financial support in order to participate.</p>
                        </div>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }
}

export default AboutProgramAccordion;
