import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AdaptingHook from '../../Components/Button/AdaptingHook';
import { Container } from './styles';
import MiniDrawer from '../../Components/Drawer/MiniDrawer';

class HomePage extends Component {
    render() {
        return (
            <div>
                <MiniDrawer>
                    <Container>
                        <Button variant="contained" color="primary">
                            Hello World
                    </Button>
                        <AdaptingHook />
                    </Container>
                </MiniDrawer>
            </div>
        );
    }
}

export default HomePage;
