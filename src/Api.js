import React from 'react'
import App from './App'

const Api = ({ actions }) => {
    const {getDeps, getMock} = actions
    const {httpClient} = getDeps()

    const _actions = {
        ...actions,
        getQs: (num=10) => httpClient ? httpClient(`api/questions?${num}`) : getMock("questions").slice(0, num),
        getQById: id => httpClient ? httpClient(`api/questions/${id}`) : getMock("questions").find(i => i.id === id),
        getAnswers: id => httpClient ? httpClient(`api/answers/${id}`) : getMock("questions").slice(0, 4).filter(i => i.id !== id).filter(Boolean),
        getImgById: id => httpClient ? httpClient(`api/imgs/${id}`) : getMock("imgs")[id],
        getAudioById: id => httpClient ? httpClient(`api/audio/${id}`) : getMock("audio")[id],
    }

    return <App actions={_actions} />
}

export default Api