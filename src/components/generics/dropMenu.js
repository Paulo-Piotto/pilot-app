import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreHorizOutlined, DeleteOutline, VisibilityOutlined, EditOutlined } from '@mui/icons-material';

export default function DropMenu({setOpenUpdate, setOpenDelete, details, edit, deletion}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (openDialog) => {
    setAnchorEl(null);
    openDialog(true)
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizOutlined color='action' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >
        <MenuItem disabled={!details} sx={{fontSize: 15}} onClick={handleClose}>
            <VisibilityOutlined fontSize='small' sx={{mr: 1}}/>
            Mostrar detalhes
            </MenuItem>
        <MenuItem disabled={!edit} sx={{fontSize: 15}} onClick={() => handleClose(setOpenUpdate)}>
            <EditOutlined fontSize='small' sx={{mr: 1}}/>
            Editar
        </MenuItem>
        <MenuItem disabled={!deletion} sx={{fontSize: 15}} onClick={() => handleClose(setOpenDelete)}>
            <DeleteOutline fontSize='small' sx={{mr: 1}}/>
            Deletar
        </MenuItem>
      </Menu>
    </div>
  );
}