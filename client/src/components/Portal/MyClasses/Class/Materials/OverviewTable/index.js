import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import content from './content';

const OverviewTable = ({ letterName }) => (
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
                    {content[ letterName ].cell1}
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
                    {content[ letterName ].cell2}
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
                <Table.Cell>
                    {content[ letterName ].cell3}
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);


export default OverviewTable;
