import React ,{useEffect, useState} from "react"
import axios from 'axios'
import styles from './MovieForm.module.css'
const AddMovieForm = ({title, movie, setTitle}) => {
    const [btnTitle, setBtnTitle] = useState('CreateMovie')
    const [formData, setFormData] = useState({
        name: '',
        cast: '',
        genere: '',
        duration: '',
        description: '',
        image: null
      });
      useEffect(() => {
        setFormData((prevState) => {
          return {...movie}
        })
        if(title === 'Add Movie'){
          setBtnTitle('Create Movie')
        }else{
          setBtnTitle('UpdateMovie')
        }
      }, [movie])

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
        data.append('cast', formData.cast);
        data.append('genere', formData.genere);
        data.append('duration', formData.duration);
        data.append('description', formData.description);
        data.append('image', formData.image);
        try {
          if(title === 'Add Movie'){

            const res = await axios.post('http://localhost:5000/api/movies', data, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Movie created successfully!');
          }else if (title === 'Update Movie'){
            const res = await axios.put(`http://localhost:5000/api/movies/${movie._id}`, data, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Movie updated successfully!');
            setTitle('Add Movie')
            setBtnTitle('Create Movie')
            setFormData({
              name: '',
              cast: '',
              genere: '',
              duration: '',
              description: '',
              image: null
            })
          }
    
          
        } catch (err) {
          console.error('Upload error:', err);
          alert('Failed to create / update movie.');
        }
      };
    
      return (
        <div className={styles['container']}>
        <div className={styles['title']}>{title}</div>
        <form onSubmit={handleSubmit} className={styles['movie-form']} >

          <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} required />
          <input type="text" name="cast" value={formData.cast} placeholder="Cast" onChange={handleChange} required />
          <input type="text" name="genere" value={formData.genere} placeholder="Genere" onChange={handleChange} required />
          <input type="text" name="duration" value={formData.duration} placeholder="Duration" onChange={handleChange} required />
          <textarea type="text" name="description" value={formData.description} placeholder="Description" onChange={handleChange} required />
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
          <button type="submit">{btnTitle}</button>
        </form>
        </div>

      );
}

export default AddMovieForm;