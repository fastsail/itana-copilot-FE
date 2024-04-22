import React from 'react'

export const LimitExceeded = () => {
    return (
        <div className='p-6 bg-red-50 rounded-[5px]'>
            <h6 className='text-md font-semibold'>Consulation Limit Exceeded</h6>
            <p className='text-sm max-w-[600px] font-light'>Looks like you've made the most of your current plan's consultations. To keep the conversation going, head over to the account tab and upgrade your plan for continued access to Itana Copilot.</p>
        </div>
    )
}
