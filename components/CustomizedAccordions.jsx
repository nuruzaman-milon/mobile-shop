import { useState } from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const CustomizedAccordions = ({ users, setUsers }) => {
  const token = Cookies.get('token')
  const [expanded, setExpanded] = useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const handleDelete = async (event, id) => {
    event.preventDefault()
    const url = `${process.env.API_URL}/api/admin/users/${id}`
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { authorization: `Bearer ${token}` },
    })

    const data = await res.json()

    if (data.success) {
      toast.success(data.message)
      // remove user from users state
      const newUsers = users.filter((user) => user._id !== id)
      setUsers(newUsers)
    } else {
      toast.error(data.message)
    }
  }

  const handleUpdate = async (event, id, isAdmin) => {
    event.preventDefault()
    if (isAdmin) {
      toast.error('User is already admin')
      return
    }
    const url = `${process.env.API_URL}/api/admin/users/${id}`
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { authorization: `Bearer ${token}` },
    })

    const data = await res.json()

    if (data.success) {
      toast.success(data.message)
      // update user in users state
      const newUsers = users.map((user) => {
        if (user._id === id) {
          return { ...user, isAdmin: true }
        }
        return user
      })
      setUsers(newUsers)
    } else {
      toast.error(data.message)
    }
  }

  return (
    <>
      {/* add loader */}
      {!users ? (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          No users
        </Typography>
      ) : (
        users?.map((user, index) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
              >
                <Typography>{user.email}</Typography>
                {/* green circle if isAdmin true */}
                {user.isAdmin && (
                  <span className="flex-shrink-0 inline-block px-2 py-0.5 ml-2 text-xs font-medium leading-4 text-green-800 bg-green-100 rounded-full">
                    Admin
                  </span>
                )}
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-3">
                  {user.network && (
                    <Typography>IP: {user.network.ip}</Typography>
                  )}
                  {/* If user.network.mac an array and if length is */}
                  {user.network &&
                    user.network.mac.map((m, index) => {
                      return (
                        <Typography key={index}>
                          MAC{' '}
                          <span className="flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium leading-4 text-orange-700 bg-orange-200 rounded-full">
                            {index + 1}
                          </span>
                          : {m}
                        </Typography>
                      )
                    })}
                  {user.network && (
                    <Typography>IPv6: {user.network.ipvSix}</Typography>
                  )}
                  {user.network && (
                    <Typography>
                      Last Login:{' '}
                      {new Date(user?.network?.updatedAt).toLocaleString()}
                    </Typography>
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(event) =>
                        handleUpdate(event, user._id, user.isAdmin)
                      }
                      className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-teal-600 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
                    >
                      Update User
                    </button>

                    <button
                      type="button"
                      onClick={(event) => handleDelete(event, user._id)}
                      className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-red-600 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          )
        })
      )}
    </>
  )
}

export default CustomizedAccordions
