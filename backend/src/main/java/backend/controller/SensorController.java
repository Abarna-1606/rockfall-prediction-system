package backend.controller;

import backend.entity.Sensor;
import backend.service.PredictionService;
import backend.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @Autowired
    private PredictionService predictionService;

    @GetMapping("/sensors")
    public List<Sensor> getAllSensors() {
        return sensorService.getAllSensors();
    }

    @PostMapping("/sensors")
    public Sensor addSensor(@RequestBody Sensor sensor) {
        return sensorService.addSensor(sensor);
    }

    @DeleteMapping("/sensors/{id}")
    public ResponseEntity<?> deleteSensor(@PathVariable Long id) {
        sensorService.deleteSensor(id);
        return ResponseEntity.ok(Map.of("message", "Sensor deleted"));
    }

    @PostMapping("/predict")
    public ResponseEntity<?> predict(@RequestBody Map<String, Double> data) {
        return ResponseEntity.ok(predictionService.predict(
            data.get("seismic"),
            data.get("slope"),
            data.get("rainfall"),
            data.get("vibration")
        ));
    }
}