'use server';

/*



*/


import { z } from 'zod';

/*
Purpose: Zod is a TypeScript-first schema declaration and validation library. 
         It helps define and validate input data structures in a type-safe manner. 
         Here, Zod will be used to ensure that the input to 
         the functions matches the expected structure defined by FormSchema
*/

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

/*



*/
import { FormSchema } from '../types';
import { cookies } from 'next/headers';

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return response;
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);

  if (data?.length) return { error: { message: 'User already exists', data } };
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });
  return response;
} 