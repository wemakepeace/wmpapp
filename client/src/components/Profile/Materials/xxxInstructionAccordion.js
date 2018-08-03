import React, { Component } from 'react';
import {
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


export const InstructionAccordion = ({ activeIndex, handleClick, letterURLs }) => {
    return (
        <Accordion fluid styled>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
                <Icon name='dropdown' />
                Letter 1
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
                <Letter1 letterURL={letterURLs && letterURLs[0]} />
            </Accordion.Content>
            <Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
                <Icon name='dropdown' />
                Letter 2
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
                <p>
                    This action is not reversable. Please make sure you do not have any exchanges in progress before deleting.
                </p>
                <Button negative>Delete Account</Button>
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 2} index={2} onClick={handleClick}>
                <Icon name='dropdown' />
                Letter 3
            </Accordion.Title>
        </Accordion>
    );
}

