import { Avatar, Card, CardContent, CardHeader, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import Linkify from 'react-linkify';

const PopularPost = ({ post }) => {
    const { _id, content, email, date, time, userLocation, img, username } = post;
    const [creator, setCreator] = useState(false);
    const localDate = time + ', ' + date + ', ' + userLocation.slice(6);
    const body = content.slice(0, 100);

    const hashtagContent = body.split(" ").map((str) => {
        if (str.startsWith("#")) {
            return <span className="hashtag">{str} </span>;
        }
        return str + " ";
    })

    useEffect(() => {
        fetch(`https://shrouded-eyrie-37217.herokuapp.com/users/${email}/creator`)
            .then(res => res.json())
            .then(data => setCreator(data.creator))
    }, [email])

    return (
        <Card sx={{ width: 1, my: 1, textAlign: 'left' }} onClick>
            <CardHeader
                avatar={
                    <Avatar alt={username} src={img} sx={{ bgcolor: "#0693E3" }} />
                }
                title={
                    <Typography variant="body1" sx={{ ml: '-2px', mb: '-4px', fontWeight: 'bold' }}>
                        {username} {creator && <Tooltip title="Verified Creator">
                            <VerifiedIcon sx={{ fontSize: 14, color: '#0693E3' }} />
                        </Tooltip>
                        }
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" sx={{ color: '#aaa', ml: '-2px', mt: 0, pt: 0 }}>
                        {localDate}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="body1" sx={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                    <Linkify>
                        {hashtagContent}
                    </Linkify>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PopularPost;