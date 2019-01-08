import React from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';
import SelectClass from '../../reusables/SelectClassDropdown';

const SupportForm = ({ onSubmitMessage, fetchClass, setState }) => {
    return (
        <div>
            <h3>Need our assistance?</h3>
            <p>If your class is enrolled in an ongoing exchange, we always encourage you to reach out to the other class' teacher before getting in touch with us.</p>
            <p>If you do need our assistance, feel free to submit your problem, and we will get back to you as soon as we are able to.</p>
            <Form>
                <Form.Field>
                    <label>Select the class your question is related to</label>
                    <SelectClass
                        onClassSelect={({ value }) => fetchClass(value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        type='text'
                        onChange={(ev) => setState({ title: ev.target.value })}
                        placeholder='Brief description of your inquiry'
                    />
                </Form.Field>
                <Form.Field>
                    <TextArea
                        onChange={(ev) => setState({ message: ev.target.value })}
                        placeholder='Explain to us in detail what you are wondering about'
                    />
                </Form.Field>
                <Button
                    type='submit'
                    onClick={onSubmitMessage}
                >Submit</Button>
            </Form>
        </div>
    );
}

export default SupportForm;


