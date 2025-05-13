<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Dashboard de Asistentes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <!-- Agregar CSS para Buttons -->
    <link href="https://cdn.datatables.net/buttons/2.2.3/css/buttons.bootstrap5.min.css" rel="stylesheet">

    <style>
        .card-counter {
            text-align: center;
            padding: 1.2rem;
            border-radius: 0.5rem;
            color: #fff;
        }

        .bg-primary {
            background-color: #0d6efd;
        }

        .bg-success {
            background-color: #198754;
        }

        .bg-warning {
            background-color: #ffc107;
            color: #212529;
        }
    </style>
</head>

<body class="bg-light">
    <div class="container py-4">

        <h2 class="mb-4">Dashboard de Asistentes</h2>

        <div class="row mb-4" id="counters">
            <div class="col-md-3">
                <div class="card-counter bg-primary">
                    <h4>Total Asistentes</h4>
                    <span id="total"></span>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card-counter bg-success">
                    <h4>Con Transporte</h4>
                    <span id="transporte_si"></span>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card-counter bg-warning">
                    <h4>Con Alergias</h4>
                    <span id="con_alergias"></span>
                </div>
            </div>
        </div>

        <table id="asistentesTable" class="table table-bordered table-hover shadow-sm">
            <thead class="table-light">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th>Asistencia</th>
                    <th>Transporte</th>
                    <th>Alergias</th>
                    <th>Acompañante</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <!-- Agregar JS para Buttons y JSZip -->
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>

    <script>
        $(document).ready(function () {
            const table = $('#asistentesTable').DataTable({
                ajax: 'http://localhost/boda/backend/datatable.php',
                columns: [
                    { data: 'id' },
                    { data: 'nombre' },
                    { data: 'apellidos' },
                    { data: 'email' },
                    { data: 'asistencia' },
                    { data: 'transporte' },
                    { data: 'alergias' },
                    {
                        data: null,
                        render: function (data) {
                            return `${data.acompanante_nombre || ''} ${data.acompanante_apellidos || ''}`;
                        }
                    },
                    { data: 'fecha' }
                ],
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
                },
                initComplete: function (settings, json) {
                    let total = json.data.length;
                    let transporte_si = json.data.filter(a => a.transporte === 'Sí').length;
                    let con_alergias = json.data.filter(a => a.alergias && a.alergias.trim() !== '').length;

                    $('#total').text(total);
                    $('#transporte_si').text(transporte_si);
                    $('#con_alergias').text(con_alergias);
                },
                dom: 'Bfrtip', // Configuración de botones
                buttons: [
                    {
                        extend: 'csv',
                        text: 'Exportar CSV',
                        title: 'Asistentes',
                        className: 'btn btn-info' // Clase Bootstrap
                    }
                ]
            });
        });
    </script>
</body>

</html>