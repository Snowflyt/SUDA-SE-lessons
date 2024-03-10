import { Input } from '@mui/material';

export interface WinnerCountInputProps {
  className?: string;
  label: string;
  disabled: boolean;
  value: number;
  onChange: (value: number) => void;
}

const WinnerCountInput: React.FC<WinnerCountInputProps> = ({
  className,
  disabled,
  label,
  onChange,
  value,
}) => {
  return (
    <div className={className}>
      <span>{label}</span>{' '}
      <Input
        disabled={disabled}
        type="number"
        inputProps={{ min: 0 }}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default WinnerCountInput;
