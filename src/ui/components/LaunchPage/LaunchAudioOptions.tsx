import * as React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import LaunchRequest from '../../../common/LaunchRequest';
import NumericInput from '../common/NumericInput';
import SwitchInput from '../common/SwitchInput';
import TextInput from '../common/TextInput';

interface LaunchAudioOptionsProps {
    launchRequest: LaunchRequest;
    setLaunchRequest: (launchRequest: LaunchRequest) => void;
}

const LaunchAudioOptions: React.FC<LaunchAudioOptionsProps> = (props: LaunchAudioOptionsProps) => {
    const { launchRequest, setLaunchRequest } = props;

    /**
     * Internal handler that will call our props.setLaunchRequest
     */
    const handleChange = React.useCallback(async (e: React.FormEvent<HTMLInputElement>) => {
        if (launchRequest[e.currentTarget.name] === true || launchRequest[e.currentTarget.name] === false) {
            setLaunchRequest({
                ...launchRequest,
                [e.currentTarget.name]: !launchRequest[e.currentTarget.name]
            });
        } else {
            setLaunchRequest({
                ...launchRequest,
                [e.currentTarget.name]: e.currentTarget.value
            });
        }
    }, [launchRequest, setLaunchRequest]);

    return <>
        <Card>
            <CardBody>
                <Row>
                    <Col xs={12} sm={3}>
                        <TextInput
                            label="Playlist Filters:"
                            name="playlistFilters"
                            onChange={handleChange}
                            value={launchRequest.playlistFilters}
                        />
                    </Col>

                    <Col xs={12} sm={3}>
                        <NumericInput
                            label="Playlist slideshow timeout:"
                            name="playlistSlideshowTimeout"
                            onChange={handleChange}
                            value={launchRequest.playlistSlideshowTimeout}
                        />
                    </Col>

                    <Col xs={12} sm={3}>
                        <SwitchInput
                            label="Shuffle Playlist:"
                            name="shufflePlaylist"
                            onChange={handleChange}
                            value={launchRequest.shufflePlaylist}
                        />
                    </Col>

                    <Col xs={12} sm={3}>
                        <NumericInput
                            label="Shuffle beats per minute:"
                            name="shuffleBeatsPerMinute"
                            onChange={handleChange}
                            value={launchRequest.shuffleBeatsPerMinute}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    </>;
};

export default LaunchAudioOptions;
