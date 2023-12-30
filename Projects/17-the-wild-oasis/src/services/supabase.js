import {createClient} from '@supabase/supabase-js';

export const supabaseUrl = 'https://vcolalxmyvmfpitlwtaz.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjb2xhbHhteXZtZnBpdGx3dGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjgwODUsImV4cCI6MjAxMTk0NDA4NX0.6PTJsyFJ-zOQaGd-PV1KSSX5O_8PxNHFJUgiiWZVq8s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;