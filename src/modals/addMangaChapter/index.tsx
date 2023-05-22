import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Divider,
  useTheme,
  Stack,
  List,
  IconButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  TextField,
} from '@mui/material';
import { AddMangaChapterModalProps } from './types';
import { DeleteRounded as DeleteRoundedIcon } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Api from '@/src/api';
import { useMutation } from 'react-query';
import { useSessionStore } from '@/src/zustand';
import { LoadingButton } from '@mui/lab';

function AddMangaChapter(props: AddMangaChapterModalProps) {
  const { open, onClose, onSuccess, mangaId, teamId } = props;
  const theme = useTheme();
  const { user, isAuthenticated } = useSessionStore((state) => state.session);

  const [volume, setVolume] = useState<number>(1);
  const [chapter, setChapter] = useState<string>('');
  const [previewList, setPreviewList] = useState<Array<any>>([]);
  const [imageList, setImageList] = useState<Array<any>>([]);

  const onUploadImage = (e: any) => {
    if (e.target.files) {
      setImageList((imgs: any) => [...imgs, ...e.target.files]);
      setPreviewList((imgs: any) => [
        ...imgs,
        ...[...e.target.files].map((file: any) => {
          return { name: file.name, src: URL.createObjectURL(file) };
        }),
      ]);
    }
  };

  const fileToBase64 = async (file: File) => {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };

  const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const previews = reorder(previewList, result.source.index, result.destination.index);
    const files = reorder(imageList, result.source.index, result.destination.index);

    setPreviewList(previews);
    setImageList(files);
  };

  const onRemove = (index: number) => {
    const newPreviews = previewList.filter((_, i) => i !== index);
    const newImages = imageList.filter((_, i) => i !== index);

    setPreviewList(newPreviews);
    setImageList(newImages);
  };

  const saveNewChapterMutation = useMutation(Api.manga.createChapter, {
    onSuccess: () => {
      onClose();
      onSuccess && onSuccess()
    },
  });

  const onSubmit = (data: any) => {
    saveNewChapterMutation.mutate({
      authorId: user?.id || 0,
      teamId,
      mangaId,
      chapter,
      volume,
      images: imageList,
    });
  };

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="add-manga-chapter-dialog-title"
      aria-describedby="add-manga-chapter-dialog-description"
    >
      <DialogTitle id="add-manga-chapter-dialog-title">Добавление главы</DialogTitle>
      <Divider />
      <DialogContent id="add-manga-chapter-dialog-description">
        <Stack spacing={1}>
          <TextField
            label="Том"
            type="number"
            onChange={(e) => setVolume(+e.target.value)}
            value={volume}
            autoFocus
            size="small"
          />
          <TextField
            label="Глава"
            onChange={(e) => setChapter(e.target.value)}
            value={chapter}
            size="small"
          />
          <Button component="label" fullWidth variant="contained">
            Загрузить изображения
            <input type="file" accept="image/*" hidden multiple onChange={onUploadImage} />
          </Button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <List {...provided.droppableProps} ref={provided.innerRef} dense>
                  {previewList.map((item: any, index: number) => {
                    // const id = nanoid();
                    return (
                      <Draggable key={item.name} draggableId={item.name} index={index}>
                        {(provided, snapshot) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => onRemove(index)}
                              >
                                <DeleteRoundedIcon />
                              </IconButton>
                            }
                            style={{ ...provided.draggableProps.style }}
                          >
                            <ListItemAvatar sx={{ mr: 1 }}>
                              <Avatar
                                src={item.src}
                                variant="square"
                                sx={{ width: 75, height: 75 }}
                              />
                            </ListItemAvatar>
                            <ListItemText primary={index} secondary={item.name} />
                          </ListItem>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <LoadingButton
          loading={saveNewChapterMutation.isLoading}
          variant="contained"
          onClick={() => onSubmit(imageList)}
        >
          Сохранить
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddMangaChapter;
