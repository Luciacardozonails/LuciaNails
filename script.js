// Datos de ejemplo para la galería
const galleryData = [
    { id: 1, src: "WhatsApp Image 2025-08-27 at 13.47.43 (1).jpeg", category: "semipermanente", title: "Esmaltado semipermanente" },
    { id: 2, src: "WhatsApp Image 2025-08-27 at 13.47.43 (2).jpeg", category: "SoftGel", title: "Uñas SoftGel" },
    { id: 3, src: "WhatsApp Image 2025-08-27 at 13.47.44 (1).jpeg", category: "SoftGel", title: "Diseño" },
    { id: 4, src: "WhatsApp Image 2025-08-27 at 13.47.43.jpeg", category: "SoftGel", title: "Esmaltado SoftGel azul" },
    { id: 5, src: "WhatsApp Image 2025-08-27 at 13.47.44.jpeg", category: "SoftGel", title: "Uñas SoftGel" },
    { id: 6, src: "WhatsApp Image 2025-08-27 at 13.47.46 (4).jpeg", category: "SoftGel", title: "Diseño SoftGel" },
    { id: 7, src: "WhatsApp Image 2025-08-27 at 13.47.46.jpeg", category: "SoftGel", title: "Esmaltado SoftGel" },
    { id: 8, src: "WhatsApp Image 2025-08-27 at 13.47.47.jpeg", category: "SoftGel", title: "Uñas SoftGel" },
    { id: 9, src: "WhatsApp Image 2025-08-27 at 13.47.44 (4).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
    { id: 10, src: "WhatsApp Image 2025-08-27 at 13.47.45 (5).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
    { id: 11, src: "WhatsApp Image 2025-08-27 at 13.47.45 (2).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
    { id: 12, src: "WhatsApp Image 2025-08-27 at 13.47.46 (2).jpeg", category: "semipermanente", title: "Diseño abstracto artístico" },
    { id: 13, src: "WhatsApp Image 2025-08-27 at 13.47.44 (2).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
    { id: 14, src: "WhatsApp Image 2025-08-27 at 13.47.45 (1).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
    { id: 15, src: "WhatsApp Image 2025-08-27 at 13.47.45 (4).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
    { id: 16, src: "WhatsApp Image 2025-08-27 at 13.47.46 (3).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
    { id: 17, src: "WhatsApp Image 2025-08-27 at 13.47.46 (5).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
    { id: 18, src: "WhatsApp Image 2025-08-27 at 13.47.44 (3).jpeg", category: "SoftGel", title: "Diseño abstracto artístico" },
];

// Variables globales
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initGallery();
    initCalendar();
    initBookingForm();
});

// Navegación responsive
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Galería de imágenes
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Cargar imágenes en la galería
    function loadGalleryImages(category = 'all') {
        galleryGrid.innerHTML = '';
        
        const filteredData = category === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === category);
        
        filteredData.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = item.category;
            
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.title;
            
            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
            
            // Evento para abrir la imagen en modal
            galleryItem.addEventListener('click', () => {
                openModal(item.src, item.title);
            });
        });
    }
    
    // Filtrado de imágenes
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Quitar clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Filtrar imágenes
            const filter = this.dataset.filter;
            loadGalleryImages(filter);
        });
    });
    
    // Cargar todas las imágenes inicialmente
    loadGalleryImages();
}

// Modal para imágenes
function openModal(src, title) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const caption = document.getElementById('modal-caption');
    
    modal.style.display = 'block';
    modalImg.src = src;
    caption.textContent = title;
    
    // Cerrar modal
    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    // Cerrar modal al hacer clic fuera de la imagen
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Calendario para agendar citas
function initCalendar() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthElement = document.getElementById('current-month');
    
    // Generar calendario inicial
    generateCalendar(currentMonth, currentYear);
    
    // Eventos para cambiar de mes
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });
}

function generateCalendar(month, year) {
    const calendarElement = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('current-month');
    
    // Nombres de meses
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1).getDay();
    // Último día del mes
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Días de la semana
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    
    // Limpiar calendario
    calendarElement.innerHTML = '';
    
    // Añadir días de la semana
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        calendarElement.appendChild(dayElement);
    });
    
    // Espacios vacíos antes del primer día
    for (let i = 0; i < firstDay; i++) {
        const emptyElement = document.createElement('div');
        emptyElement.className = 'calendar-date';
        calendarElement.appendChild(emptyElement);
    }
    
    // Días del mes
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = i;
        
        // Obtener el día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
        const currentDate = new Date(year, month, i);
        const dayOfWeek = currentDate.getDay();
        
        // Comprobar si es una fecha pasada
        if (currentDate < today && currentDate.getDate() !== today.getDate()) {
            dateElement.classList.add('disabled');
        } 
        // Comprobar si es domingo (día no laborable)
        else if (dayOfWeek === 0) {
            dateElement.classList.add('disabled', 'non-working');
        }
        // Comprobar si es martes o jueves (días con horario especial)
        else if (dayOfWeek === 2 || dayOfWeek === 4) {
            dateElement.classList.add('special-day');
            dateElement.addEventListener('click', function() {
                selectDate(this, year, month, i);
            });
        }
        // Resto de días laborables
        else {
            dateElement.addEventListener('click', function() {
                selectDate(this, year, month, i);
            });
        }
        
        calendarElement.appendChild(dateElement);
    }
    
    // Añadir leyenda después del calendario
    addCalendarLegend();
}

function selectDate(element, year, month, day) {
    // Quitar selección anterior
    document.querySelectorAll('.calendar-date.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Seleccionar nueva fecha
    element.classList.add('selected');
    selectedDate = new Date(year, month, day);
    
    // Actualizar horas disponibles
    updateAvailableTimes();
}

function addCalendarLegend() {
    // Comprobar si la leyenda ya existe
    if (document.querySelector('.calendar-legend')) {
        return;
    }
    
    const calendarContainer = document.querySelector('.calendar-container');
    const legend = document.createElement('div');
    legend.className = 'calendar-legend';
    
    // Leyenda para días con horario especial (martes y jueves)
    const specialLegend = document.createElement('div');
    specialLegend.className = 'legend-item';
    specialLegend.innerHTML = `
        <span class="legend-color legend-special"></span>
        <span>Martes y Jueves: 14:30 - 16:30</span>
    `;
    
    // Leyenda para días no laborables
    const nonWorkingLegend = document.createElement('div');
    nonWorkingLegend.className = 'legend-item';
    nonWorkingLegend.innerHTML = `
        <span class="legend-color legend-non-working"></span>
        <span>Domingo: Cerrado</span>
    `;
    
    legend.appendChild(specialLegend);
    legend.appendChild(nonWorkingLegend);
    calendarContainer.appendChild(legend);
}

// Formulario de reserva
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    
    // Generar opciones de hora
    generateTimeOptions();
    
    // Enviar formulario
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!selectedDate) {
            alert('Por favor, selecciona una fecha para tu cita.');
            return;
        }
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            time: document.getElementById('time').value,
            date: selectedDate
        };
        
        // Obtener el texto del servicio seleccionado
        const serviceText = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
        
        // Formatear la fecha en un formato legible
        const formattedDate = selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Crear mensaje para WhatsApp
        const whatsappMessage = `¡Hola! Quiero reservar una cita para el servicio de ${serviceText}.\n\n` +
                               `*Detalles de la reserva:*\n` +
                               `📅 Fecha: ${formattedDate}\n` +
                               `⏰ Hora: ${formData.time}\n` +
                               `👤 Nombre: ${formData.name}\n` +
                               `📞 Teléfono: ${formData.phone}\n` +
                               `📧 Email: ${formData.email}\n\n` +
                               `Por favor, confírmenme si la hora y fecha están disponibles.`;
        
        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Número de WhatsApp (reemplaza con tu número real)
        const whatsappNumber = "+59891948115"; // Ejemplo: usa "5491112345678" para Argentina
        
        // Crear el enlace de WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Abrir WhatsApp en una nueva ventana
        window.open(whatsappURL, '_blank');
        
        // Mensaje de confirmación
        alert(`¡Solicitud de cita enviada!\n\nSe abrirá WhatsApp para que completes la reserva.`);
        
        // Resetear formulario
        bookingForm.reset();
        selectedDate = null;
        document.querySelectorAll('.calendar-date.selected').forEach(item => {
            item.classList.remove('selected');
        });
    });
}

function generateTimeOptions() {
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = '<option value="">Selecciona una hora</option>';
    
    // Si no hay fecha seleccionada, no mostrar horas
    if (!selectedDate) return;
    
    // Obtener el día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)
    const dayOfWeek = selectedDate.getDay();
    
    // Definir horarios según el día
    let availableTimes = [];
    
    // Martes (2) y Jueves (4)
    if (dayOfWeek === 2 || dayOfWeek === 4) {
        availableTimes = ['14:30', '16:30'];
    } 
    // Resto de los días
    else {
        availableTimes = ['14:30', '16:30', '18:00'];
    }
    
    // Generar las opciones de hora
    availableTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

function updateAvailableTimes() {
    const timeSelect = document.getElementById('time');
    
    // Si no hay fecha seleccionada, limpiar y deshabilitar el selector
    if (!selectedDate) {
        timeSelect.innerHTML = '<option value="">Selecciona una hora</option>';
        timeSelect.disabled = true;
        return;
    }
    
    // Habilitar el selector de hora
    timeSelect.disabled = false;
    
    // Generar las opciones de hora según el día seleccionado
    generateTimeOptions();
    
    // Simular que algunas horas ya están ocupadas (opcional)
    const options = timeSelect.querySelectorAll('option');
    const disabledCount = Math.floor(Math.random() * 2); // 0-1 horas ocupadas
    
    // Habilitar todas las opciones primero
    options.forEach(option => {
        if (option.value !== '') {
            option.disabled = false;
        }
    });
    
    // Deshabilitar algunas horas aleatoriamente para simular citas existentes
    for (let i = 0; i < disabledCount; i++) {
        const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
        options[randomIndex].disabled = true;
        options[randomIndex].textContent += ' (Ocupado)';
    }

}


        document.addEventListener('DOMContentLoaded', function() {
            const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
            const transferenciaInfo = document.getElementById('transferencia-info');

            paymentMethods.forEach(method => {
                method.addEventListener('change', function() {
                    if (this.value === 'transferencia') {
                        transferenciaInfo.style.display = 'block';
                    } else {
                        transferenciaInfo.style.display = 'none';
                    }
                });
            });

            // También puedes agregar esta funcionalidad al formulario existente en script.js
            const bookingForm = document.getElementById('booking-form');
            if (bookingForm) {
                bookingForm.addEventListener('submit', function(e) {
                    const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
                    if (!selectedPayment) {
                        e.preventDefault();
                        alert('Por favor selecciona un método de pago');
                    }
                });
            }
        });


