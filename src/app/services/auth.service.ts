import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { createClient } from '@supabase/supabase-js'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private supabase:SupabaseClient;
  constructor() { 
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.supabase.auth.onAuthStateChange((event,session)=>{
      console.log('auth changed:',event);
      console.log('auth changed session:',session);
    })
  }
  createAccount({email,password}:{email:string,password:string}){
    return this.supabase.auth.signUp({email,password});
  }
  login({email,password}:{email:string,password:string}){
    return this.supabase.auth.signIn({email,password});
  }
}
