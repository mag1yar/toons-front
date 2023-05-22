import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Divider, Stack, Link } from '@mui/material';
import { AuthModalProps } from './types';
import { FormProvider, useForm } from 'react-hook-form';
import Field from '@/src/components/field';
import { useMutation } from 'react-query';
import { useSessionStore } from '@/src/zustand';
import { LoadingButton } from '@mui/lab';
import Api from '@/src/api';
import { SignInBody, SignUpBody } from '@/src/api/auth/types';
import { useConfirm } from '@/src/hooks';

function AuthModal(props: AuthModalProps) {
  const { open, handleClose } = props;
  const confirm = useConfirm();

  const [isLogin, setIsLogin] = useState(true);

  const signIn = useSessionStore((state) => state.signIn);

  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const signInMutation = useMutation(Api.auth.signIn, {
    onSuccess: (data) => {
      signIn(data);
      handleClose();
    },
  });

  const signUpMutation = useMutation(Api.auth.signUp, {
    onSuccess: (data) => {
      handleClose();
      setIsLogin(true);
      confirm({
        title:
          'Регистрация сәтті аяқталды! Верификацияны аяқтау үшін электрондық поштаңызды тексеріңіз',
        body: (
          <div>
            Регистрация сәтті орындалды! Әзір аккаунтыңызды растау қалған – оны тексеру үшін.
            <br />
            Сіздің электрондық поштаңызға тексеру сілтемесімен хат жіберілді. Электрондық поштаңызды
            тексеріп, верификация процесін аяқтау үшін сілтеме бойынша өтіңіз. Егер біздің хатты
            таба алмасаңыз, &quot;Спам&quot; немесе &quot;Акциялар&quot; қалтасын тексеріңіз.
            <br />
            Маңызды: Верификация сілтемесі 24 сағат ішінде жарамды. Егер сіз бұл уақыт ішінде
            аккаунтыңызды растамасаңыз, регистрация процесін қайталауыңыз керек.
            <br />
            Егер сізде сұрақтар немесе проблемалар туындаса, қолдау қызметімен байланысыңыз.
            <br />
            Регистрация үшін рақмет, сайтқа қош келдіңіз!
          </div>
        ),
        hideCancelButton: true,
        dialogProps: {
          maxWidth: 'md'
        }
      });
    },
  });

  const onSubmit = (data: any) => {
    if (isLogin) return signInMutation.mutate(data as SignInBody);

    if (data.password !== data.confirmPassword) {
      // enqueueSnackbar('Құпия сөздер сәйкес келмейді', { variant: 'error' });
      return;
    }

    return signUpMutation.mutate(data as SignUpBody);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{isLogin ? 'Авторландыру' : 'Тіркелу'}</DialogTitle>
      <DialogContent>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <Field
                name="email"
                margin="dense"
                id="email"
                label="Эл. пошта"
                type="email"
                fullWidth
                variant="outlined"
                size="small"
              />

              {!isLogin && (
                <Field
                  name="name"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Қолданушы аты"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
              <Field
                name="password"
                margin="dense"
                id="password"
                label="Құпия сөз"
                type="password"
                fullWidth
                variant="outlined"
                size="small"
              />
              {!isLogin && (
                <Field
                  name="confirmPassword"
                  margin="dense"
                  id="confirmPassword"
                  label="Құпия сөзді қайталаңыз"
                  type="password"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
              <Link href="#" sx={{ textAlign: 'right' }} variant="caption" underline="hover">
                {isLogin && 'Құпия сөзіңізді ұмыттыңыз ба?'}
              </Link>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={signInMutation.isLoading || signUpMutation.isLoading}
              >
                {isLogin ? 'Авторландыру' : 'Тіркелу'}
              </LoadingButton>
              <Divider />
              <Button variant="outlined" onClick={() => setIsLogin((isLogin) => !isLogin)}>
                {isLogin ? 'Тіркелу' : 'Авторландыру'}
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
