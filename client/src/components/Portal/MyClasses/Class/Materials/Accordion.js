import React, { Component } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import Information from './Information';
import Letter1 from './Letter1';
import Letter2 from './Letter2';
import Letter3 from './Letter3';

export default class AccordionExampleStandard extends Component {
    state = { activeIndex: -1 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        const { letterURLs, classRole, exchangeClass } = this.props;
        return (
            <Accordion styled fluid>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    General Information
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <div className='materials-content'>
                        <Information exchangeClass={exchangeClass} />
                    </div>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Instructions Letter 1
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <div className='materials-content'>
                        <Letter1
                            letterURLs={letterURLs}
                            classRole={classRole}
                            exchangeClass={exchangeClass}
                        />
                    </div>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Instructions Letter 2
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <div className='materials-content'>
                        <Letter2
                            letterURLs={letterURLs}
                            classRole={classRole}
                            exchangeClass={exchangeClass}
                        />
                    </div>
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    Instructions Letter 3
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 3}>
                    <div className='materials-content'>
                        <Letter3
                            letterURLs={letterURLs}
                            classRole={classRole}
                            exchangeClass={exchangeClass}
                        />
                    </div>
                </Accordion.Content>
            </Accordion>
        );
    }
}
