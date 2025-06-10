import React ,{useState} from "react"
import axios from 'axios'
import styles from './RoomForm.module.css'
const AddRoomForm = () => {
     const [formData, setFormData] = useState({
        name: '',
        image: null,
        row: '',
        col: '',

      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'image') {
          setFormData({ ...formData, image: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('row', formData.row);
        data.append('col', formData.col);
        data.append('image', formData.image);
        try {
          const res = await axios.post('http://localhost:5000/api/rooms', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });

          console.log('Room created:', res.data);
          alert('Room created successfully!');
        } catch (err) {
          console.error('Upload error:', err);
          alert('Failed to create room.');
        }
      };
    
      return (
        <div className={styles['container']}>
          <div className={styles['title']}>Add Room</div>
        
          <form onSubmit={handleSubmit} className={styles['room-form']}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="row" placeholder="Row" onChange={handleChange} required />
            <input type="text" name="col" placeholder="Col" onChange={handleChange} required />
            <input type="file" name="image" accept="image/*" onChange={handleChange} required />
            <button type="submit">Create Room</button>
          </form>
        </div>
      );
}

export default AddRoomForm;