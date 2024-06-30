import { AiOutlineMail } from 'react-icons/ai';

export default function Mailto({ email }) {
  const subject = "Information related to Conscientia 2k24";
  const body = "";

  return (
    <div className=''>
      <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>
      <AiOutlineMail /> 
      <p>{        
        email
        }</p>
      </a>
    </div>
  );
}