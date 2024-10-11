import Image from 'next/image';
import batman from '@/app/assets/batman.jpeg';
import { AlertTitle } from '@/components/ui/alert';

export default function About_me() {
  return (
  <div>
    <h1>Hello World I am kishore</h1>
    <Image src = {batman} alt = "Batman"/>
    <p><b>  Name:</b> Kishore</p>
    <p><b>  Major:</b>Information systems</p>
    <p><b>  Hobbies:</b> I like to code </p>

    
    
  </div>
  );
}
