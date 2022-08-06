import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useCallback, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

export type TForm = {
  title: string;
  content: string;
};

type TProps = {
  initialValues?: TForm;
  onSubmit: (form: TForm) => void;
};

const schema = zod.object({
    title: zod.string().min(1, 'Title is required'),
    content: zod.string().min(1, 'Content is required')
});

const EditPost = ({ initialValues, onSubmit }: TProps) => {
  const {
    handleSubmit: handleUseFormSubmit,
    register,
    formState: { errors },
  } = useForm<TForm>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: zodResolver(schema)
  });

  console.log(errors);

  const handleValid: SubmitHandler<TForm> = useCallback(
    (data) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  const handleSubmit = useMemo(
    () => handleUseFormSubmit(handleValid),
    [handleValid, handleUseFormSubmit]
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8} item>
          <Stack spacing={2}>
            <TextField
              {...register("title", {
                required: true,
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
              label="Title"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              {...register("content", {
                required: true,
              })}
              error={!!errors.content}
              helperText={errors.content?.message}
              label="Content"
              variant="outlined"
              autoComplete="off"
              multiline
              maxRows={100}
              rows={10}
            />
          </Stack>
        </Grid>
        <Grid xs={12} md={4} item>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditPost;
