package backend.controller;

import backend.repository.AlertRepository;
import backend.repository.SensorRepository;
import backend.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSensors", sensorRepository.count());
        stats.put("totalAlerts", alertRepository.count());
        stats.put("totalZones", zoneRepository.count());
        stats.put("activeAlerts", alertRepository.findByIsResolvedFalse().size());
        return stats;
    }
}