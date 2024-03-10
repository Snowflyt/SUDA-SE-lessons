import { Box, Button, Input, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';

export interface DrawPanelProps {
  className?: string;
  rewardName: string;
  disabled?: boolean;
  max?: number;
  onDraw?: (count: number) => void;
  winnerNames?: string[];
}

const DrawPanel: React.FC<DrawPanelProps> = ({
  className,
  disabled,
  max,
  onDraw,
  rewardName,
  winnerNames,
}) => {
  const [drawCount, setDrawCount] = useState(0);

  return (
    <div className={className}>
      <h2>{rewardName}</h2>
      <div className="mb-2">
        <Input
          disabled={disabled}
          type="number"
          inputProps={{ min: 0, max }}
          value={drawCount}
          onChange={(e) => {
            setDrawCount(Number(e.target.value));
          }}
        />
        <Button
          disabled={disabled || drawCount === 0}
          onClick={() => {
            onDraw?.(drawCount);
          }}>
          抽取{rewardName}
        </Button>
      </div>

      <Box className="w-full" sx={{ maxWidth: 360, bgcolor: '#f7f7f7' }}>
        <List>
          {(winnerNames ?? []).map((name) => (
            <ListItem className="h-10" key={name}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default DrawPanel;
