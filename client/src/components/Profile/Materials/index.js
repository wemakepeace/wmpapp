import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMaterials } from '../../../redux/actions/exchange';
import {
    Table,
    Grid,
    Header,
    Image,
    Form,
    Segment,
    Message,
    Button,
    Menu,
    Accordion,
    Icon
} from 'semantic-ui-react';


const OverviewTable = () => (
  <Table basic='very' celled collapsing>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Header.Content>
                REQUIRES
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
            Blackboard, paper for students to write and draw on, WMP templates, a photo of each student to be included in their letters.
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Header.Content>
              INVOLVES
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
            Group discussion, mind-map, note-writing, group work, prioritizing, making a list,
            listening, sharing, letter writing.
            </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Header.Content>
              LEARNING
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>Empathy, positivism, acceptance, compassion, creativity, solution-based thinking, trouble-shooting, letter writing, processing new concepts, analytical skills.
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)


class Materials extends Component  {
    state = {
        activeIndex: null,
        letterURLs: []
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount() {
        return this.props.getMaterials()
    }

    render() {
        const { letterURLs } = this.props.exchange;
        const { activeIndex } = this.state

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h2>Instructions & Materials</h2>
                    <p>sjfkgfjhkgjhgldfklfgjhlkflgkhjrtljhlgkjfdglhr</p>
                </div>
                <div className='profile-segment'>
                    <h3>LETTER EXCHANGE MATERIALS</h3>
                    { letterURLs && letterURLs.length ?
                        letterURLs.map((url, index) => (
                        <div>
                            <span key={index}><a href={url} target='_blank'>Letter {index + 1}</a></span>
                        </div>
                        ))
                    : null
                    }
                </div>
                <div className='profile-segment'>
                    <h3>BEFORE YOU START</h3>
                    <p>
                    The following instructions are designed to guide you through the Peace Letters exchange process. It’s pretty simple. Please read and follow these basic steps below to make sure the process go smoothly. Please also take the time to implement the lesson plans, as they are a vital part of ensuring a valuable exchange experience for you and your students. You are meant to do each lesson, as you receive the letters from the other school (a part from the first round).
                    </p>
                    <h3>CHECK LIST</h3>
                        <ul>
                            <li>
                                Before mailing the letters make sure you read/skim through the contents of the students’ letters to ensure there is no abusive or undesirable content
                            </li>
                            <li>
                                Make sure that all students have written their names on the letters, and for letter 2 and 3 also their pen pals name
                            </li>
                            <li>
                                Make sure you post the letters to the correct address using the right amount of postage required
                            </li>
                        </ul>
                </div>
                <div className='profile-segment'>
                    <h3>TEACHER INSTRUCTIONS AND LESSONS</h3>
                    <Accordion fluid styled>
                        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            Letter 1
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            <div>
                                <span><a href={letterURLs && letterURLs[0]} target='_blank'>Letter 1</a></span>
                                <OverviewTable />
                            </div>

                        </Accordion.Content>
                        <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            Letter 2
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <p>
                                This action is not reversable. Please make sure you do not have any exchanges in progress before deleting.
                            </p>
                            <Button negative>Delete Account</Button>
                        </Accordion.Content>

                        <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            Letter 3
                        </Accordion.Title>
                    </Accordion>

                </div>

            </div>
        )

    }
}


const mapStateToProps = ({ exchange }) => {
    return {
        exchange
    }
}

export default connect(mapStateToProps, { getMaterials })(Materials);
