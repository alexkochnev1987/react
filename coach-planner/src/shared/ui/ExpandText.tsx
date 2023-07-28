import { CardActions, CardContent, Collapse, IconButton } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const ExpandText = ({
  label,
  children,
  text,
}: {
  label: string;
  children?: React.ReactNode;
  text?: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((x) => !x);
  return (
    <>
      <CardActions disableSpacing sx={{ padding: 0 }}>
        {label}
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          disabled={!children && !text}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {children && <CardContent>{children}</CardContent>}
        {text && <CardContent>{text}</CardContent>}
      </Collapse>
    </>
  );
};
