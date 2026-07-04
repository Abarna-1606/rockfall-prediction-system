package backend.controller;

import backend.entity.Zone;
import backend.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/zones")
@CrossOrigin(origins = "http://localhost:3000")
public class ZoneController {

    @Autowired
    private ZoneRepository zoneRepository;

    @GetMapping
    public List<Zone> getAllZones() {
        return zoneRepository.findAll();
    }

    @PostMapping
    public Zone addZone(@RequestBody Zone zone) {
        return zoneRepository.save(zone);
    }

    @DeleteMapping("/{id}")
    public void deleteZone(@PathVariable Long id) {
        zoneRepository.deleteById(id);
    }
}