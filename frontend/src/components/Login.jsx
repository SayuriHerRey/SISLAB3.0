import React, { useState } from 'react';
import '../Login.css';

const Login = ({ onLogin, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryStep, setRecoveryStep] = useState(1); // 1: Ingresar email, 2: Código, 3: Nueva contraseña
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
    setRecoveryMessage('');
  };

  const handleRecoverySubmit = async (e) => {
    e.preventDefault();
    setRecoveryLoading(true);
    setRecoveryMessage('');

    try {
      // Simular envío de código de recuperación
      if (recoveryStep === 1) {
        // Validar que sea un email de UNACH
        if (!recoveryEmail.endsWith('@unach.mx')) {
          setRecoveryMessage('Por favor, utiliza tu correo institucional (@unach.mx)');
          setRecoveryLoading(false);
          return;
        }
        
        // Simular envío de código (en una aplicación real, aquí harías una llamada API)
        setTimeout(() => {
          setRecoveryStep(2);
          setRecoveryMessage(`Se ha enviado un código de verificación a ${recoveryEmail}`);
          setRecoveryLoading(false);
        }, 1500);
      
      } else if (recoveryStep === 2) {
        // Validar código (en una aplicación real, verificarías con el backend)
        if (recoveryCode.length !== 6) {
          setRecoveryMessage('El código debe tener 6 dígitos');
          setRecoveryLoading(false);
          return;
        }
        
        setTimeout(() => {
          setRecoveryStep(3);
          setRecoveryMessage('Código verificado correctamente. Ahora puedes establecer tu nueva contraseña.');
          setRecoveryLoading(false);
        }, 1000);
      
      } else if (recoveryStep === 3) {
        // Validar nueva contraseña
        if (newPassword.length < 6) {
          setRecoveryMessage('La contraseña debe tener al menos 6 caracteres');
          setRecoveryLoading(false);
          return;
        }
        
        if (newPassword !== confirmPassword) {
          setRecoveryMessage('Las contraseñas no coinciden');
          setRecoveryLoading(false);
          return;
        }
        
        // Simular cambio de contraseña exitoso
        setTimeout(() => {
          setRecoveryMessage('¡Contraseña actualizada correctamente! Ahora puedes iniciar sesión.');
          setTimeout(() => {
            setShowForgotPassword(false);
            setRecoveryStep(1);
            setRecoveryEmail('');
            setRecoveryCode('');
            setNewPassword('');
            setConfirmPassword('');
            setRecoveryMessage('');
          }, 2000);
        }, 1500);
      }
    } catch (error) {
      setRecoveryMessage('Error en el proceso de recuperación. Intenta nuevamente.');
      setRecoveryLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setRecoveryStep(1);
    setRecoveryEmail('');
    setRecoveryCode('');
    setNewPassword('');
    setConfirmPassword('');
    setRecoveryMessage('');
  };

  const handleResendCode = () => {
    setRecoveryLoading(true);
    // Simular reenvío de código
    setTimeout(() => {
      setRecoveryMessage('Se ha reenviado el código de verificación a tu correo');
      setRecoveryLoading(false);
    }, 1000);
  };

  // Datos de prueba para mostrar en la interfaz
  const credencialesPrueba = [
    { rol: 'Administrador', email: 'admin@unach.mx', password: '1234' },
    { rol: 'Docente', email: 'docente@unach.mx', password: '1234' },
    { rol: 'Alumno', email: 'alumno@unach.mx', password: '1234' }
  ];

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Panel izquierdo con información del sistema */}
        <div className="login-info-panel">
          <div className="logo-section">
            <div className="logo-image-container">
              <img 
                src="..\logoSISLAB.png" 
                alt="SISLAB - UNACH" 
                className="logo-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="logo-fallback">
                <span>SISLAB</span>
              </div>
            </div>
            <h1 className="unach-title">Universidad Autónoma de Chiapas</h1>
            <h1 className="system-name">Sistema de Gestión de Laboratorios de Computo</h1>
          </div>
          
          <div className="system-info">
            <div className="welcome-message">
              <h2>¡Bienvenido a SISLAB!</h2>
              <p className="system-description">
                Plataforma unificada para la administración y uso eficiente de los laboratorios de cómputo.
                Simplifica procesos, mejora la organización y fortalece el aprendizaje en nuestra institucion.
              </p>
            </div>
          </div>
        </div>
        
        {/* Panel derecho con formulario de login */}
        <div className="login-form-panel">
          <div className="login-form-container">
            
            {!showForgotPassword ? (
              // Formulario de login normal
              <>
                <div className="login-header">
                  <h2 className="form-title">Iniciar Sesión</h2>
                  <p className="form-subtitle">Ingresa tus datos institucionales para iniciar sesión</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="email" className="input-label">Correo Electrónico</label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu.correo@unach.mx"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password" className="input-label">Contraseña</label>
                    <input
                      id="password"
                      type="password"
                      className="form-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="login-button" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Iniciando sesión...
                      </>
                    ) : 'Iniciar Sesión'}
                  </button>
                </form>

                <div className="forgot-password">
                  <a href="#recuperar" onClick={handleForgotPassword}>
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </>
            ) : (
              // Formulario de recuperación de contraseña
              <>
                <div className="login-header">
                  <button 
                    onClick={handleBackToLogin}
                    className="back-button"
                  >
                    ← Volver al login
                  </button>
                  <h2 className="form-title">Recuperar Contraseña</h2>
                  <p className="form-subtitle">
                    {recoveryStep === 1 && 'Ingresa tu correo institucional para recuperar tu contraseña'}
                    {recoveryStep === 2 && 'Ingresa el código de verificación enviado a tu correo'}
                    {recoveryStep === 3 && 'Establece tu nueva contraseña'}
                  </p>
                </div>
                
                <form onSubmit={handleRecoverySubmit} className="login-form">
                  {recoveryStep === 1 && (
                    <div className="form-group">
                      <label htmlFor="recoveryEmail" className="input-label">
                        Correo Electrónico Institucional
                      </label>
                      <input
                        id="recoveryEmail"
                        type="email"
                        className="form-input"
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        placeholder="tu.correo@unach.mx"
                        required
                      />
                      <small className="input-help">
                        Solo se permiten correos institucionales @unach.mx
                      </small>
                    </div>
                  )}
                  
                  {recoveryStep === 2 && (
                    <>
                      <div className="form-group">
                        <label htmlFor="recoveryCode" className="input-label">
                          Código de Verificación
                        </label>
                        <input
                          id="recoveryCode"
                          type="text"
                          className="form-input"
                          value={recoveryCode}
                          onChange={(e) => setRecoveryCode(e.target.value.replace(/\D/g, ''))}
                          placeholder="123456"
                          maxLength="6"
                          required
                        />
                        <small className="input-help">
                          Ingresa el código de 6 dígitos que enviamos a tu correo
                        </small>
                      </div>
                      <div className="resend-code">
                        <button 
                          type="button" 
                          onClick={handleResendCode}
                          disabled={recoveryLoading}
                          className="resend-button"
                        >
                          {recoveryLoading ? 'Enviando...' : 'Reenviar código'}
                        </button>
                      </div>
                    </>
                  )}
                  
                  {recoveryStep === 3 && (
                    <>
                      <div className="form-group">
                        <label htmlFor="newPassword" className="input-label">
                          Nueva Contraseña
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          className="form-input"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••"
                          minLength="6"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="confirmPassword" className="input-label">
                          Confirmar Contraseña
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          className="form-input"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••"
                          minLength="6"
                          required
                        />
                      </div>
                    </>
                  )}
                  
                  {recoveryMessage && (
                    <div className={`recovery-message ${
                      recoveryMessage.includes('¡') ? 'success' : 'error'
                    }`}>
                      {recoveryMessage}
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="login-button" 
                    disabled={recoveryLoading}
                  >
                    {recoveryLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Procesando...
                      </>
                    ) : (
                      recoveryStep === 1 ? 'Enviar Código' : 
                      recoveryStep === 2 ? 'Verificar Código' : 
                      'Cambiar Contraseña'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;