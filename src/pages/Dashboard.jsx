import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { dashboardStyles as styles } from '../assets/dummystyle'
import { useNavigate } from 'react-router-dom'
import { LucideFilePlus, LucideTrash2 } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths'
import toast from 'react-hot-toast'
import { ResumeSummaryCard } from '../components/Cards'
import moment from 'moment'
import ModalLS from '../components/ModalLS'
import CreateResumeForm from '../components/CreateResumeForm'

const Dashboard = () => {

  const navigate = useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    resume.workExperience?.forEach(exp => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    resume.education?.forEach(edu => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    resume.skills?.forEach(skill => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    resume.projects?.forEach(project => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    resume.certifications?.forEach(cert => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    resume.languages?.forEach(lang => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    totalFields += (resume.interests?.length || 0);
    completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

    return Math.round((completedFields / totalFields) * 100); 
  };

  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      console.log("Fetched resumes:", response.data); // ✅ Debug log added
      const resumesWithCompletion = response.data.map(resume => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));
      setAllResumes(resumesWithCompletion);
    } catch (error) {
      console.log('error fetching resumes', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleDeleteResume = async () =>{
    if(!resumeToDelete) return ;

    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete));
      toast.success('Resume deleted successfully');
      fetchAllResumes()
    } 
    catch (error) {
       console.log('error deleting resume', error);
       toast.error('failed to delete resume');
    }
    finally{
      setResumeToDelete(null);
      setShowDeleteConfirm(false);
    }
  }

  const handleDeleteClick = (id) => {
    setResumeToDelete(id);
    setShowDeleteConfirm(true);
  }

  return (
    <DashboardLayout>
      <img className="absolute top-0 right-0 opacity-60 -z-10" src="./gradient.png" alt="Gradient-img" />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#b456ec] -rotate-[-30deg] -z-10"></div>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <div className='flex flex-col gap-2'>
            <h1 className={styles.headerTitle}>My Resumes</h1>
            <p className={styles.headerSubtitle}>{allResumes.length > 0 ? `You have ${allResumes.length} resume${allResumes.length !== 1 ? 's' : ''}` : 'Start building your professional resume'}
            </p>
          </div>
          <div className=' flex gap-4'>
            <button className={styles.createButton} onClick={() => setOpenCreateModel(true)}>
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Now
                <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={18} />
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* ✅ FIX: changed condition to !loading for empty state */}
        {!loading && allResumes.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus size={38} className='text-violet-600' />
            </div>
            <h3 className={styles.emptyTitle}>No Resumes Yet</h3>
            <p className={styles.emptyText}>
              You haven't created any resumes yet. Start building your professional resume today!
            </p>

            <button className={styles.createButton} onClick={() => setOpenCreateModel(true)}>
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Your First Resume
                <LucideFilePlus className='group-hover:translate-x-1 transition-transform' size={20} />
              </span>
            </button>
          </div>
        )}

        {/* Grid view */}
        {!loading && allResumes.length > 0 && (
          <div className={styles.grid}>
            <div className={styles.newResumeCard} onClick={() => setOpenCreateModel(true)}>
              <div className={styles.newResumeIcon}>
                {/* Add resume icon or content here */}
                <LucideFilePlus size={32}  className='text-white'/>
              </div>
              <h3 className={styles.newResumeTitle}>Create New Resume</h3>
              <p className={styles.newResumeText}>Start Building Your Career</p>
            </div>

            {allResumes.map((resume)=>(
              <ResumeSummaryCard key={resume._id} imgUrl={resume.thumbnailLink} 
              title={resume.title} createdAt={resume.createdAt}  updatedAt={resume.updatedAt}
              onSelect={()=> navigate(`/resume/${resume._id}`)}
              onDelete={()=> handleDeleteClick(resume._id)}
              completion={resume.completion || 0}
              isPremium={resume.isPremium}
              isNew = {moment().diff(moment(resume.createdAt), 'days') < 7}

              />
            ))}

          </div>
        )}

      </div>

        {/* Create modal */}
        <ModalLS isOpen={openCreateModel} onClose={() =>setOpenCreateModel(false)} hideHeader maxWidth='max-w-2xl'>
          <div className='p-6'>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Create New Resumes</h3>

              <button onClick={()=> setOpenCreateModel(false) } className={styles.modalCloseButton}>
                X
              </button>
            </div>
            <CreateResumeForm onSuccess={()=>{
              setOpenCreateModel(false);
              fetchAllResumes();
            }} />
          </div>
        </ModalLS>

        {/* Delete Modal */}
            <ModalLS isOpen={showDeleteConfirm} onClose={()=> setShowDeleteConfirm(false)} title='Confirm Deletion' 
              showActionBtn actionBtnText='Delete' actionBtnClassName='bg-red-600 hover:bg-red-700' onActionClick={handleDeleteResume} >
                <div className='p-4'>
                  <div className='flex flex-col items-center text-center'>
                    <div className={styles.deleteIconWrapper}>
                      <LucideTrash2 className='text-orange-600' size={24} />

                    </div>
                    <h3 className={styles.deleteTitle}>Delete Resume?</h3>
                    <p className={styles.deleteText}>
                      Are you sure you want to delete this resume? This action cannot be undone.
                    </p>
                  </div>
                </div>
            </ModalLS>

            <img className="absolute bottom-0 left-0 opacity-60 -z-10" src="./gradient.png" alt="Gradient-img" />
      <div className="h-0 w-[40rem] absolute bottom-[20%] left-[-5%] shadow-[0_0_900px_20px_#b456ec] -rotate-[-30deg] -z-10"></div>
    </DashboardLayout>
  )
}

export default Dashboard
