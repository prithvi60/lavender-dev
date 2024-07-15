import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
// import editIcon from '../../../assets/editbtn.svg';
import { Button } from "../../../components/ui/button";
import { AppointmentDateSelector } from "./AppointmentControllers";
import { useDrawer } from "../../../features/Business/BusinessDrawerContext";

export default function EditMemberForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [filterStartDate, setFilterStartDate] = useState(new Date());
  const [filterEndDate, setFilterEndDate] = useState('');

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const { closeDrawer } = useDrawer();

  const handleFilterDrawerSubmit = () => {
    
    closeDrawer();
  };

  return (
    <div className="flex-col h-full p-4">
      <div className="text-lg h-14 mb-2 text-white bg-blue-950 p-4">Edit Memberss</div>
      
      <div className="flex justify-center items-center h-32 mb-4">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         
        >
          <Avatar src="/broken-image.jpg" style={{ backgroundColor: '#1B1464' }} />
        </Badge>
      </div>

      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <TextField
        label="Email ID"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Access Level</InputLabel>
        <Select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
          label="Access Level"
        >
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>

      <AppointmentDateSelector
        startDate={filterStartDate}
        endDate={filterEndDate}
        startDateControl={setFilterStartDate}
        endDateControl={setFilterEndDate}
      />

      <div className="flex justify-between mt-4">
        <Button
          onClick={closeDrawer}
          variant="ghost"
          style={{ color: "#825FFF" }}
        >
          Cancel
        </Button>
        <Button onClick={handleFilterDrawerSubmit}>
          Add
        </Button>
      </div>
    </div>
  );
}
