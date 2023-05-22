import React from 'react';
import { SearchRounded as SearchRoundedIcon } from '@mui/icons-material';
import { Button, Dialog, DialogContent, IconButton, TextField, Tooltip } from '@mui/material';

function SearchButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Іздеу" arrow>
        <IconButton size="small" color="inherit" onClick={handleClickOpen}>
          <SearchRoundedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'flex-start',
          },
        }}
      >
        {/* <DialogTitle>Іздеу</DialogTitle> */}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="search"
            label="Іздеу"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SearchButton;
