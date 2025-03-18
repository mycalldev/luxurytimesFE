'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getSupabase } from '../../../app/lib/supabase';
import styles from './watches.module.css';
import ContactForm from '../../components/ContactForm';

// Component that uses searchParams and needs to be wrapped in Suspense
function WatchesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [watches, setWatches] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentWatch, setCurrentWatch] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    models: 0
  });
  const [expandedWatch, setExpandedWatch] = useState(null);
  // New state for JSON import
  const [showJsonImport, setShowJsonImport] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState(null);
  
  // Get the Supabase client instance
  const supabase = getSupabase();

  const [formData, setFormData] = useState({
    user: '',
    live: 'true',
    nickname: '',
    title: '',
    title_backend: '',
    brand: 'Rolex',
    model: '',
    ref: '',
    strap: '',
    dial: '',
    image_amount: 1,
    strap_material: '',
    strap_colour: '',
    strap_clasp: '',
    dial_size: '',
    number_markers: '',
    hands: '',
    case_material: '',
    bezel: '',
    bezel_style: '',
    bezel_direction: '',
    price: '',
    caliber: '',
    movement: '',
    power_reserve: '',
    water_resistant: '',
    number_of_jewels: '',
    crystal: '',
    gender: 'Men',
    box: 'Yes',
    card: 'Yes',
    condition: 'Excellent',
    warranty: 'None',
    available: 'Yes',
    description_mobile: '',
    description_desktop: '',
    rating: 5,
    number_of_reviews: 0
  });

  useEffect(() => {
    console.log('Watches page mounted');
    fetchWatches();
  }, []);

  const fetchWatches = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching watches from database...');
      const { data, error } = await supabase
        .from('rolex_watch')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching watches:', error);
        throw error;
      }
      
      console.log('Watches fetched successfully:', data);
      setWatches(data || []);
      
      // Calculate stats
      if (data) {
        const available = data.filter(watch => watch.available === 'Yes').length;
        const uniqueModels = new Set(data.map(watch => watch.model)).size;
        
        setStats({
          total: data.length,
          available: available,
          models: uniqueModels
        });
      }
    } catch (err) {
      console.error('Error fetching watches:', err);
      setError('Failed to fetch watches: ' + (err.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (['price', 'image_amount', 'rating', 'number_of_reviews'].includes(name)) {
      const numValue = value === '' ? '' : parseInt(value);
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create a watch data object from the form data
      const watchData = { ...formData };
      
      console.log('Preparing to save watch data:', watchData);
      
      let result;
      
      if (currentWatch) {
        // Update existing watch
        console.log('Updating existing watch with ID:', currentWatch.unique_id);
        const { data, error } = await supabase
          .from('rolex_watch')
          .update(watchData)
          .eq('unique_id', currentWatch.unique_id)
          .select();
          
        if (error) {
          console.error('Error updating watch:', error);
          throw new Error(`Failed to update watch: ${error.message || error}`);
        }
        
        console.log('Watch updated successfully:', data);
        result = data;
      } else {
        // Create new watch entry
        console.log('Creating new watch entry');
        
        const { data, error } = await supabase
          .from('rolex_watch')
          .insert([watchData])
          .select();
          
        if (error) {
          console.error('Error inserting watch:', error);
          throw new Error(`Failed to insert watch: ${error.message || error}`);
        }
        
        result = data;
      }
      
      // Refresh watches list
      await fetchWatches();
      
      // Reset form to defaults
      setFormData({
        user: '',
        live: 'true',
        nickname: '',
        title: '',
        title_backend: '',
        brand: 'Rolex',
        model: '',
        ref: '',
        strap: '',
        dial: '',
        image_amount: 1,
        strap_material: '',
        strap_colour: '',
        strap_clasp: '',
        dial_size: '',
        number_markers: '',
        hands: '',
        case_material: '',
        bezel: '',
        bezel_style: '',
        bezel_direction: '',
        price: '',
        caliber: '',
        movement: '',
        power_reserve: '',
        water_resistant: '',
        number_of_jewels: '',
        crystal: '',
        gender: 'Men',
        box: 'Yes',
        card: 'Yes',
        condition: 'Excellent',
        warranty: 'None',
        available: 'Yes',
        description_mobile: '',
        description_desktop: '',
        rating: 5,
        number_of_reviews: 0
      });
      
      setCurrentWatch(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error saving watch:', err);
      setError(err.message || 'Failed to save watch. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (watch) => {
    console.log('Editing watch with data:', watch);
    setCurrentWatch(watch);
    setFormData({
      ...watch
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this watch?')) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('rolex_watch')
        .delete()
        .eq('unique_id', id);
        
      if (error) throw error;
      
      // Refresh watches list
      await fetchWatches();
    } catch (err) {
      console.error('Error deleting watch:', err);
      setError(err.message || 'Failed to delete watch');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle details
  const toggleDetails = (watchId) => {
    setExpandedWatch(expandedWatch === watchId ? null : watchId);
  };

  // Handle JSON import
  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
    setJsonError(null);
  };

  const handleJsonImport = () => {
    try {
      setJsonError(null);
      
      // Validate and parse JSON
      if (!jsonInput.trim()) {
        setJsonError('Please enter JSON data');
        return;
      }
      
      const parsedData = JSON.parse(jsonInput);
      
      // Basic validation of required fields
      if (!parsedData.title || !parsedData.model || !parsedData.ref) {
        setJsonError('JSON must include at least title, model, and ref fields');
        return;
      }
      
      // Convert fields to match form structure
      // Note: form uses camelCase for some fields, database uses snake_case
      setFormData({
        user: parsedData.user || '',
        live: parsedData.live || 'true',
        nickname: parsedData.nickname || '',
        title: parsedData.title || '',
        title_backend: parsedData.title_backend || '',
        brand: parsedData.brand || 'Rolex',
        model: parsedData.model || '',
        ref: parsedData.ref || '',
        strap: parsedData.strap || '',
        dial: parsedData.dial || '',
        image_amount: parsedData.image_amount || 1,
        strap_material: parsedData.strap_material || '',
        strap_colour: parsedData.strap_colour || '',
        strap_clasp: parsedData.strap_clasp || '',
        dial_size: parsedData.dial_size || '',
        number_markers: parsedData.number_markers || '',
        hands: parsedData.hands || '',
        case_material: parsedData.case_material || '',
        bezel: parsedData.bezel || '',
        bezel_style: parsedData.bezel_style || '',
        bezel_direction: parsedData.bezel_direction || '',
        price: parsedData.price || '',
        caliber: parsedData.caliber || '',
        movement: parsedData.movement || '',
        power_reserve: parsedData.power_reserve || '',
        water_resistant: parsedData.water_resistant || '',
        number_of_jewels: parsedData.number_of_jewels || '',
        crystal: parsedData.crystal || '',
        gender: parsedData.gender || 'Men',
        box: parsedData.box || 'Yes',
        card: parsedData.card || 'Yes',
        condition: parsedData.condition || 'Excellent',
        warranty: parsedData.warranty || 'None',
        available: parsedData.available || 'Yes',
        description_mobile: parsedData.description_mobile || '',
        description_desktop: parsedData.description_desktop || '',
        rating: parsedData.rating || 5,
        number_of_reviews: parsedData.number_of_reviews || 0
      });
      
      // Show the form with imported data
      setCurrentWatch(null);
      setShowForm(true);
      setShowJsonImport(false);
      
      // Success message
      alert('JSON data imported successfully! Review the data and submit to create the watch.');
    } catch (err) {
      console.error('Error parsing JSON:', err);
      setJsonError(`Invalid JSON format: ${err.message}`);
    }
  };

  if (isLoading && watches.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading watches...</p>
      </div>
    );
  }

  return (
    <div className={styles.watchesContainer}>
      <nav className={styles.backNavigation}>
        <Link href="/admin/dashboard" className={styles.backButton}>
          <span className={styles.backIcon}>←</span> Back to Dashboard
        </Link>
      </nav>
      
      <header className={styles.watchesHeader}>
        <h1 className={styles.watchesTitle}>Watch Management Dashboard</h1>
        <div className={styles.headerButtons}>
          <button 
            onClick={() => {
              setShowJsonImport(!showJsonImport);
              setShowForm(false);
            }} 
            className={styles.importButton}
          >
            {showJsonImport ? 'Cancel Import' : 'Import JSON'}
          </button>
          <button 
            onClick={() => {
              setCurrentWatch(null);
              setFormData({
                user: '',
                live: 'true',
                nickname: '',
                title: '',
                title_backend: '',
                brand: 'Rolex',
                model: '',
                ref: '',
                strap: '',
                dial: '',
                image_amount: 1,
                strap_material: '',
                strap_colour: '',
                strap_clasp: '',
                dial_size: '',
                number_markers: '',
                hands: '',
                case_material: '',
                bezel: '',
                bezel_style: '',
                bezel_direction: '',
                price: '',
                caliber: '',
                movement: '',
                power_reserve: '',
                water_resistant: '',
                number_of_jewels: '',
                crystal: '',
                gender: 'Men',
                box: 'Yes',
                card: 'Yes',
                condition: 'Excellent',
                warranty: 'None',
                available: 'Yes',
                description_mobile: '',
                description_desktop: '',
                rating: 5,
                number_of_reviews: 0
              });
              setShowForm(!showForm);
              setShowJsonImport(false);
            }} 
            className={styles.addButton}
          >
            {showForm ? 'Cancel' : 'Add New Watch'}
          </button>
        </div>
      </header>

      {/* JSON Import Section */}
      {showJsonImport && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Import Watch from JSON</h2>
          
          <div className={styles.jsonImportContainer}>
            <p className={styles.jsonImportInstructions}>
              Paste a valid JSON object with watch data below. The data will be used to populate the watch form for review before saving.
            </p>
            
            {jsonError && (
              <div className={styles.errorMessage}>
                <strong>Error:</strong> {jsonError}
              </div>
            )}
            
            <textarea
              className={styles.jsonTextarea}
              value={jsonInput}
              onChange={handleJsonInputChange}
              placeholder='{"title": "Rolex Submariner", "model": "Submariner", "ref": "116610LN", ...}'
              rows={15}
            />
            
            <div className={styles.jsonImportActions}>
              <button
                type="button"
                onClick={() => {
                  setShowJsonImport(false);
                  setJsonInput('');
                  setJsonError(null);
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleJsonImport}
                className={styles.importJsonButton}
              >
                Import Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Watch Stats Dashboard */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Watches</h3>
          <p className={styles.statValue}>{stats.total}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Available</h3>
          <p className={styles.statValue}>{stats.available}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Unique Models</h3>
          <p className={styles.statValue}>{stats.models}</p>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <strong>Error:</strong> {error}
          <button 
            onClick={() => setError(null)} 
            className={styles.errorCloseButton}
          >
            ×
          </button>
        </div>
      )}

      {showForm && (
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>
            {currentWatch ? `Edit Watch: ${currentWatch.title || currentWatch.model}` : 'Add New Watch'}
          </h2>
          
          <form onSubmit={handleSubmit} className={styles.watchForm}>
            {/* Basic Information Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.formLabel}>Title *</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Watch Title (e.g., Rolex Submariner Date)"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="title_backend" className={styles.formLabel}>Backend Title</label>
                  <input
                    id="title_backend"
                    type="text"
                    name="title_backend"
                    value={formData.title_backend || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Backend Title"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="model" className={styles.formLabel}>Model *</label>
                  <input
                    id="model"
                    type="text"
                    name="model"
                    value={formData.model || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Watch Model (e.g., Submariner)"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="ref" className={styles.formLabel}>Reference *</label>
                  <input
                    id="ref"
                    type="text"
                    name="ref"
                    value={formData.ref || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Reference Number (e.g., 116610LN)"
                    required
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="price" className={styles.formLabel}>Price *</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Price in GBP"
                    required
                    min="0"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="available" className={styles.formLabel}>Availability</label>
                  <select
                    id="available"
                    name="available"
                    value={formData.available || 'Yes'}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="Yes">Available</option>
                    <option value="No">Unavailable</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="brand" className={styles.formLabel}>Brand</label>
                  <input
                    id="brand"
                    type="text"
                    name="brand"
                    value={formData.brand || 'Rolex'}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    readOnly
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="nickname" className={styles.formLabel}>Nickname</label>
                  <input
                    id="nickname"
                    type="text"
                    name="nickname"
                    value={formData.nickname || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Watch Nickname (e.g., Hulk)"
                  />
                </div>
              </div>
            </div>
            
            {/* Dial & Strap Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Dial & Strap</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="dial" className={styles.formLabel}>Dial</label>
                  <input
                    id="dial"
                    type="text"
                    name="dial"
                    value={formData.dial || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Dial Color/Type"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="dial_size" className={styles.formLabel}>Dial Size</label>
                  <input
                    id="dial_size"
                    type="text"
                    name="dial_size"
                    value={formData.dial_size || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Dial Size (e.g., 40mm)"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="number_markers" className={styles.formLabel}>Hour Markers</label>
                  <input
                    id="number_markers"
                    type="text"
                    name="number_markers"
                    value={formData.number_markers || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Hour Markers (e.g., Luminous)"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="hands" className={styles.formLabel}>Hands</label>
                  <input
                    id="hands"
                    type="text"
                    name="hands"
                    value={formData.hands || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Hand Type (e.g., Mercedes)"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="strap" className={styles.formLabel}>Strap</label>
                  <input
                    id="strap"
                    type="text"
                    name="strap"
                    value={formData.strap || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Strap Type (e.g., Oyster)"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="strap_material" className={styles.formLabel}>Strap Material</label>
                  <input
                    id="strap_material"
                    type="text"
                    name="strap_material"
                    value={formData.strap_material || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Material (e.g., Stainless Steel)"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="strap_colour" className={styles.formLabel}>Strap Color</label>
                  <input
                    id="strap_colour"
                    type="text"
                    name="strap_colour"
                    value={formData.strap_colour || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Strap Color"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="strap_clasp" className={styles.formLabel}>Clasp</label>
                  <input
                    id="strap_clasp"
                    type="text"
                    name="strap_clasp"
                    value={formData.strap_clasp || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Clasp Type (e.g., Folding)"
                  />
                </div>
              </div>
            </div>
            
            {/* Case & Bezel Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Case & Bezel</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="case_material" className={styles.formLabel}>Case Material</label>
                  <input
                    id="case_material"
                    type="text"
                    name="case_material"
                    value={formData.case_material || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Case Material"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="crystal" className={styles.formLabel}>Crystal</label>
                  <input
                    id="crystal"
                    type="text"
                    name="crystal"
                    value={formData.crystal || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Crystal Type (e.g., Sapphire)"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="bezel" className={styles.formLabel}>Bezel</label>
                  <input
                    id="bezel"
                    type="text"
                    name="bezel"
                    value={formData.bezel || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Bezel (e.g., Ceramic)"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="bezel_style" className={styles.formLabel}>Bezel Style</label>
                  <input
                    id="bezel_style"
                    type="text"
                    name="bezel_style"
                    value={formData.bezel_style || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Bezel Style"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="bezel_direction" className={styles.formLabel}>Bezel Direction</label>
                  <input
                    id="bezel_direction"
                    type="text"
                    name="bezel_direction"
                    value={formData.bezel_direction || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Bezel Direction (e.g., Unidirectional)"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="water_resistant" className={styles.formLabel}>Water Resistance</label>
                  <input
                    id="water_resistant"
                    type="text"
                    name="water_resistant"
                    value={formData.water_resistant || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Water Resistance (e.g., 300m)"
                  />
                </div>
              </div>
            </div>
            
            {/* Movement Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Movement</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="caliber" className={styles.formLabel}>Caliber</label>
                  <input
                    id="caliber"
                    type="text"
                    name="caliber"
                    value={formData.caliber || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Caliber (e.g., 3135)"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="movement" className={styles.formLabel}>Movement</label>
                  <input
                    id="movement"
                    type="text"
                    name="movement"
                    value={formData.movement || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Movement Type (e.g., Automatic)"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="power_reserve" className={styles.formLabel}>Power Reserve</label>
                  <input
                    id="power_reserve"
                    type="text"
                    name="power_reserve"
                    value={formData.power_reserve || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Power Reserve (e.g., 48 hours)"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="number_of_jewels" className={styles.formLabel}>Number of Jewels</label>
                  <input
                    id="number_of_jewels"
                    type="text"
                    name="number_of_jewels"
                    value={formData.number_of_jewels || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Number of Jewels (e.g., 31)"
                  />
                </div>
              </div>
            </div>
            
            {/* Condition & Extras Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Condition & Extras</h3>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="condition" className={styles.formLabel}>Condition</label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition || 'Excellent'}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="New">New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="warranty" className={styles.formLabel}>Warranty</label>
                  <input
                    id="warranty"
                    type="text"
                    name="warranty"
                    value={formData.warranty || ''}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    placeholder="Warranty Information"
                  />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="box" className={styles.formLabel}>Box</label>
                  <select
                    id="box"
                    name="box"
                    value={formData.box || 'Yes'}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="card" className={styles.formLabel}>Papers/Card</label>
                  <select
                    id="card"
                    name="card"
                    value={formData.card || 'Yes'}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="gender" className={styles.formLabel}>Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || 'Men'}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="image_amount" className={styles.formLabel}>Number of Images</label>
                  <input
                    id="image_amount"
                    type="number"
                    name="image_amount"
                    value={formData.image_amount || '1'}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            {/* Description Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Descriptions</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="description_mobile" className={styles.formLabel}>Mobile Description</label>
                <textarea
                  id="description_mobile"
                  name="description_mobile"
                  value={formData.description_mobile || ''}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Description for mobile view"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="description_desktop" className={styles.formLabel}>Desktop Description</label>
                <textarea
                  id="description_desktop"
                  name="description_desktop"
                  value={formData.description_desktop || ''}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  placeholder="Description for desktop view"
                />
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
              <button
                type="button" 
                onClick={() => setShowForm(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : (currentWatch ? 'Update Watch' : 'Add Watch')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.watchesList}>
        <h2 className={styles.sectionTitle}>Watch Inventory</h2>
        
        {watches.length === 0 ? (
          <div className={styles.emptyState}>
            No watches found. Add your first watch above.
          </div>
        ) : (
          <div className={styles.watchesTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Watch</div>
              <div className={styles.tableCell}>Reference</div>
              <div className={styles.tableCell}>Status</div>
              <div className={styles.tableCell}>Price</div>
              <div className={styles.tableCell}>Actions</div>
              <div className={styles.tableCell}>Image</div>
            </div>
            
            {watches.map(watch => (
              <div key={watch.unique_id}>
                <div className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <div className={styles.watchInfo}>
                      {/* Placeholder for watch image - you can add real image later */}
                      <div className={styles.watchDetails}>
                        <p className={styles.watchTitle}>{watch.title || watch.model}</p>
                        <p className={styles.watchRef}>{watch.model}</p>
                        <button 
                          onClick={() => toggleDetails(watch.unique_id)} 
                          className={styles.detailsToggle}
                        >
                          {expandedWatch === watch.unique_id ? 'Hide Details' : 'Show Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tableCell}>{watch.ref}</div>
                  <div className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${
                      watch.available === 'Yes' 
                        ? styles.statusAvailable 
                        : watch.available === 'Sold' 
                          ? styles.statusSold 
                          : styles.statusUnavailable
                    }`}>
                      {watch.available === 'Yes' 
                        ? 'Available' 
                        : watch.available === 'Sold' 
                          ? 'Sold' 
                          : 'Unavailable'}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    <span className={styles.watchPrice}>
                      £{typeof watch.price === 'number' ? watch.price.toLocaleString() : watch.price}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.watchActions}>
                      <button 
                        onClick={() => handleEdit(watch)} 
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(watch.unique_id)} 
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.thumbnailContainer}>
                      <img 
                        src="/126610LVsubmariner1._Thumbnail.JPG" 
                        alt={`${watch.brand} ${watch.model}`}
                        className={styles.watchThumbnail}
                        width={75}
                        height={75}
                      />
                    </div>
                  </div>
                </div>
                
                {expandedWatch === watch.unique_id && (
                  <div className={styles.metadataDetails}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Dial:</span>
                      <span className={styles.metaValue}>{watch.dial || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Dial Size:</span>
                      <span className={styles.metaValue}>{watch.dial_size || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Case Material:</span>
                      <span className={styles.metaValue}>{watch.case_material || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Bezel:</span>
                      <span className={styles.metaValue}>{watch.bezel || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Movement:</span>
                      <span className={styles.metaValue}>{watch.movement || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Caliber:</span>
                      <span className={styles.metaValue}>{watch.caliber || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Strap:</span>
                      <span className={styles.metaValue}>{watch.strap || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Strap Material:</span>
                      <span className={styles.metaValue}>{watch.strap_material || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Condition:</span>
                      <span className={styles.metaValue}>{watch.condition || 'Not specified'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Box & Papers:</span>
                      <span className={styles.metaValue}>
                        {watch.box === 'Yes' ? 'Box' : ''}{watch.box === 'Yes' && watch.card === 'Yes' ? ' & ' : ''}
                        {watch.card === 'Yes' ? 'Papers' : ''}
                        {watch.box !== 'Yes' && watch.card !== 'Yes' ? 'None' : ''}
                      </span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Created:</span>
                      <span className={styles.metaValue}>{watch.created_at ? new Date(watch.created_at).toLocaleString() : 'Not set'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>Last Updated:</span>
                      <span className={styles.metaValue}>{watch.updated_at ? new Date(watch.updated_at).toLocaleString() : 'Not set'}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main component that renders the wrapped WatchesContent component
export default function AdminWatches() {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading content...</p>
      </div>
    }>
      <WatchesContent />
      {/* <div className={styles.contactFormContainer}>
        <ContactForm 
          contactTitle="Contact Watch Specialist" 
          contactDescription="Need help with watch inventory or have questions about a specific timepiece? Our specialists are here to assist you."
        />
      </div> */}
    </Suspense>
  );
} 