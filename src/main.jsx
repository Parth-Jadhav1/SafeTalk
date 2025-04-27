import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Routing_App from './POC/Routing_App.jsx'
import AuthWrapper from './POC/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
<AuthWrapper>
  <BrowserRouter>
      <Routing_App></Routing_App>
  </BrowserRouter>
</AuthWrapper>
)
